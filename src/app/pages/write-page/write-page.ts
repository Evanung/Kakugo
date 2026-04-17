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
import { Button } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PostSubmission } from '../../services/submissions/post-submission';
import { SupabaseService } from '../../services/supabase-service';
import { Dictionary } from '../../components/write/dictionary/dictionary';
import { Grammar } from '../../components/write/grammar/grammar';

@Component({
  selector: 'app-write-page',
  imports: [SplitterModule, TextBox, TabsModule, PromptInfo, SubmissionList, FormsModule, CommonModule, SelectButton, Button, ToastModule, Dictionary, Grammar],
  providers: [MessageService],
  templateUrl: './write-page.html',
  styleUrl: './write-page.css',
})
export class WritePage {
  // Injections of services
  private route = inject(ActivatedRoute);
  private promptService = inject(PromptService);
  // Angular toast component
  private messageService = inject(MessageService);

  constructor(
    private postSubmissionService: PostSubmission,
    private supabaseService: SupabaseService
  ) {}

  // Default tab on prompt tools is prompt info - is updated when changed
  activeTab = signal('0')

  promptId = this.route.snapshot.paramMap.get('id');
  prompt = signal<Prompt | null>(null);

  // Current String of TextBox Child
  currentText = signal('');
  // Refreshes submission on submit
  refreshSubmissions = signal(0);

  // Post Visibility Option / Is Public on default
  visibilityOptions = [
    { label: 'Public', value: true },
    { label: 'Private', value: false }
  ];
  isVisible: boolean = true;


  // Updates currentText from child component TextBox to make sure that the current text is up to date for post submissions
  onTextChange(text: string) {
    this.currentText.set(text);
  }

  // Initializes prompt then sends that data to child
  ngOnInit() {
    const id = this.promptId ?? '0';

    this.promptService.getPromptById(id).subscribe({
      next: ({ data, error }) => {
        if (error || !data) return;
        this.prompt.set(data);
      }
    });
  }

  // Submits text from child component text
  async submit() {
    if (!this.currentText()) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Please enter some text before submitting.'
      });
      return;
    }

    const { data: { user } } = await this.supabaseService.client.auth.getUser();
    this.postSubmissionService.createPost({
      prompt_id: this.prompt()!.id,
      title: '',
      description: this.currentText(),
      user_id: user!.id,
      is_public: this.isVisible
    }).subscribe({
      next: ({ error }) => {
        if (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Submission Failed',
            detail: error.message ?? 'Something went wrong. Please try again.'
          });
        } else {
          this.currentText.set('');
          this.activeTab.set('1');
          this.refreshSubmissions.update(v => v + 1);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Post submitted successfully!'
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Network Error',
          detail: err.message ?? 'An unexpected error occurred.'
        });
      }
    });
  }
}
