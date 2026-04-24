import { Component, output, input, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PostSubmission } from '../../../services/submissions/post-submission';
import { SupabaseService } from '../../../services/supabase-service';
import { WriteService} from '../../../services/writing/write-service';
import { ActivatedRoute } from '@angular/router';
import {Button, ButtonModule} from 'primeng/button';
import {Splitter} from 'primeng/splitter';
import { DiffService, DiffResult } from '../../../services/writing/diff-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-text-box',
  imports: [FormsModule, EditorModule, ToggleButtonModule, Button, Splitter],
  templateUrl: './text-box.html',
  styleUrl: './text-box.css',
})
export class TextBox implements OnInit {
  private postSubmissionService = inject(PostSubmission);
  private supabaseService = inject(SupabaseService);
  private writeService = inject(WriteService);
  private route = inject(ActivatedRoute);
  private diffService = inject(DiffService);
  private sanitizer = inject(DomSanitizer)

  diffHtml = signal<SafeHtml | null>(null)
  text = signal('');
  title: string = 'Title Test';
  improvedText = signal<string | null>(null);
  checking = signal(false);
  error = signal<string | null>(null);

  onTextChange = output<string>();

  async ngOnInit() {
    const promptId = this.route.snapshot.paramMap.get('id');
    const { data: { user } } = await this.supabaseService.client.auth.getUser();

    if (user && promptId) {
      const { data } = await this.postSubmissionService.getDraft(user.id, Number(promptId));
      if (data) {
        this.text.set(data.description);
      }
    }
  }

  async checkWriting() {
    if (!this.text().trim()) return

    this.checking.set(true)
    this.error.set(null)
    this.diffHtml.set(null)

    try {
      const result = await this.writeService.improveText(this.text())
      const plainOriginal = this.stripHtml(this.text())
      const diffs = this.diffService.compareTexts(plainOriginal, result.improved)
      const html = this.diffService.buildHighlightedHtml(diffs)
      this.diffHtml.set(this.sanitizer.bypassSecurityTrustHtml(html)) // ✅ only this line
    } catch (err) {
      this.error.set('Something went wrong, please try again')
    } finally {
      this.checking.set(false)
    }
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
}
