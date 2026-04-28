import {Component, inject, output, signal} from '@angular/core';
import {Button} from "primeng/button";
import {WriteService} from '../../../services/writing/write-service';
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
  private writeService = inject(WriteService);
  private diffService = inject(DiffService);
  private sanitizer = inject(DomSanitizer)

  diffHtml = signal<SafeHtml | null>(null)
  text = signal('');
  checking = signal(false);
  error = signal<string | null>(null);

  async checkWriting() {
    if (!this.text().trim()) return

    this.checking.set(true)
    this.error.set(null)

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

  clearText(){
    this.text.set('');
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
}
