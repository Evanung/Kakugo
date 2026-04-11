import { Component, inject, signal } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { TextBox} from '../../components/write/text-box/text-box';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute } from '@angular/router';
import { PromptInfo } from '../../components/write/prompt-info/prompt-info';
import { Prompt, PromptService} from '../../services/prompt-service';
import { SubmissionList} from '../../components/write/submission-list/submission-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import {Button } from 'primeng/button';

import { PostSubmission } from '../../services/submissions/post-submission';
import { SupabaseService } from '../../services/supabase-service';

@Component({
  selector: 'app-write-page',
  imports: [SplitterModule, TextBox, TabsModule, PromptInfo, SubmissionList, FormsModule, CommonModule, SelectButton, Button],
  templateUrl: './write-page.html',
  styleUrl: './write-page.css',
})
export class WritePage {
  private route = inject(ActivatedRoute);
  private promptService = inject(PromptService);
  promptId = this.route.snapshot.paramMap.get('id');
  prompt = signal<Prompt | null>(null);

  currentText: string = '';
  onTextChange(text: string) {
    this.currentText = text;
  }

  // Visibility Check
  visibilityOptions = [
    { label: 'Public', value: true },
    { label: 'Private', value: false }
  ];
  isVisible: boolean = true;

  constructor(
    private postSubmissionService: PostSubmission,
    private supabaseService: SupabaseService
  ) {}

  defaultPrompt: Prompt = {
    id: 0,
    difficulty:1,
    prompt_title: 'Free write',
    description: ['Write about anything here', 'Feel free to use the built-in dictionary and grammar tools to help you'],
    questions: ['How are you feeling today', 'Anything interesting happen recently?']
  };

  // Initializes prompt then sends that data to child
  ngOnInit() {
    if (!this.promptId) {
      this.prompt.set(this.defaultPrompt);
      return;
    }

    this.promptService.getPromptById(this.promptId).subscribe({
      next: ({ data, error }) => {
        if (error || !data) {
          this.prompt.set(this.defaultPrompt);
          return;
        }
        this.prompt.set(data);
      }
    });
  }


  // Submits text from child component text
  async submit() {
    if (!this.currentText) return;

    const { data: { user } } = await this.supabaseService.client.auth.getUser();

    this.postSubmissionService.createPost({
      prompt_id: this.prompt()!.id,
      title: '',
      description: this.currentText,
      user_id: user!.id,
      is_public: this.isVisible
    }).subscribe(({ error }) => {
      if (error) console.error(error);
      else this.currentText = '';
    });
  }
}
