import {Component, inject, output, signal} from '@angular/core';
import {Button} from "primeng/button";
import {PostSubmission} from '../../../services/submissions/post-submission';
import {SupabaseService} from '../../../services/supabase-service';
import {WriteService} from '../../../services/writing/write-service';
import {ActivatedRoute} from '@angular/router';
import {DiffService} from '../../../services/writing/diff-service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-sentence-analyze',
  imports: [
    Button, FormsModule, Textarea,
  ],
  templateUrl: './sentence-analyze.html',
  styleUrl: './sentence-analyze.css',
})
export class SentenceAnalyze {
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
      this.diffHtml.set(this.sanitizer.bypassSecurityTrustHtml(html))
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
