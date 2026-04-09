import {Component, inject, signal} from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { TextBox} from '../../components/write/text-box/text-box';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute } from '@angular/router';
import { PromptInfo } from '../../components/write/prompt-info/prompt-info';
import {Prompt, PromptService} from '../../services/prompt-service';

@Component({
  selector: 'app-write-page',
  imports: [SplitterModule, TextBox, TabsModule, PromptInfo],
  templateUrl: './write-page.html',
  styleUrl: './write-page.css',
})
export class WritePage {
  private route = inject(ActivatedRoute);
  private promptService = inject(PromptService);

  promptId = this.route.snapshot.paramMap.get('id');

  defaultPrompt: Prompt = {
    id: 0,
    difficulty:1,
    prompt_title: 'Free write',
    description: ['Write about anything here', 'Feel free to use the built-in dictionary and grammar tools to help you'],
    questions: ['How are you feeling today', 'Anything interesting happen recently?']
  };

  prompt = signal<Prompt | null>(null);

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


}
