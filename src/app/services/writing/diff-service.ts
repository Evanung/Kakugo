import { Injectable } from '@angular/core';
import * as Diff from 'diff';

export interface DiffResult {
  value: string;
  added?: boolean;
  removed?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DiffService {

  compareTexts(original: string, improved: string): DiffResult[] {
    // Diff word by word for natural Japanese/English comparison
    return Diff.diffWords(original, improved)
  }

  // Returns HTML string with green/red highlights
  buildHighlightedHtml(diffs: DiffResult[]): string {
    return diffs.map(part => {
      if (part.added) {
        return `<span class="diff-added">${part.value}</span>`
      }
      if (part.removed) {
        return `<span class="diff-removed">${part.value}</span>`
      }
      return `<span>${part.value}</span>`
    }).join('')
  }
}
