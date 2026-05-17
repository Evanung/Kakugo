import { Component, inject, signal, SecurityContext } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { TextBox } from '../../components/write/text-box/text-box';
import { TabsModule } from 'primeng/tabs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { PromptInfo } from '../../components/write/prompt-info/prompt-info';
import { PromptService, Prompt } from '../../services/prompt-service';
import { SubmissionList } from '../../components/write/submission-list/submission-list';
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
import { SentenceAnalyze } from '../../components/write/sentence-analyze/sentence-analyze';
import { Translate } from '../../components/write/translate/translate';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-write-page',
  imports: [SplitterModule, TextBox, TabsModule, PromptInfo, SubmissionList, FormsModule, CommonModule,
    SelectButton, Button, ToastModule, Dictionary, Grammar, SentenceAnalyze, RouterLink, Translate],
  providers: [MessageService],
  templateUrl: './write-page.html',
  styleUrl: './write-page.css',
})
export class WritePage {
  private route = inject(ActivatedRoute);
  private promptService = inject(PromptService);
  private messageService = inject(MessageService);
  private sanitizer = inject(DomSanitizer);

  constructor(
    private postSubmissionService: PostSubmission,
    private supabaseService: SupabaseService
  ) {}

  activeTab = signal('0');
  activeTab_grammar = signal('0');

  promptId = this.route.snapshot.paramMap.get('id');
  prompt = signal<Prompt | null>(null);
  currentText = signal('');
  refreshSubmissions = signal(0);
  isSavingDraft = signal(false);
  hasDraft = signal(false);

  visibilityOptions = [
    { label: 'Public', value: true },
    { label: 'Private', value: false }
  ];
  isVisible: boolean = true;

  onTextChange(text: string) {
    this.currentText.set(text);
  }

  private getSanitizedText(): string {
    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, this.currentText()) ?? '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = sanitized;
    return textarea.value;
  }

  ngOnInit() {
    const id = this.promptId ?? '0';

    this.promptService.getPromptById(id).subscribe({
      next: ({ data, error }) => {
        if (error || !data) return;
        this.prompt.set(data);
      }
    });
  }


  async saveDraft() {
    if (!this.currentText()) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Nothing to save yet.'
      });
      return;
    }

    this.isSavingDraft.set(true);
    const { data: { user } } = await this.supabaseService.client.auth.getUser();

    try {
      const { error } = await this.postSubmissionService.saveDraft({
        prompt_id: this.prompt()!.id,
        description: this.getSanitizedText(),
        user_id: user!.id
      });

      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Save Failed',
          detail: error.message ?? 'Could not save draft.'
        });
      } else {
        this.hasDraft.set(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Draft Saved',
          detail: 'Your draft has been saved.'
        });
      }
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Network Error',
        detail: err.message ?? 'An unexpected error occurred.'
      });
    } finally {
      this.isSavingDraft.set(false);
    }
  }

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

    try {
      const { error } = await this.postSubmissionService.createPost({
        prompt_id: this.prompt()!.id,
        title: '',
        description: this.getSanitizedText(),
        user_id: user!.id,
        is_public: this.isVisible
      });

      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Submission Failed',
          detail: error.message ?? 'Something went wrong. Please try again.'
        });
      } else {
        this.currentText.set('');
        this.hasDraft.set(false);
        this.activeTab.set('1');
        this.refreshSubmissions.update(v => v + 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Post submitted successfully!'
        });
      }
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Network Error',
        detail: err.message ?? 'An unexpected error occurred.'
      });
    }
  }
}
