import { Component, signal } from '@angular/core';
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import { GrammarService, GrammarResult } from '../../../services/grammar-service';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'app-grammar',
  imports: [
    Button,
    IconField,
    InputIcon,
    InputText,
    Skeleton
  ],
  templateUrl: './grammar.html',
  styleUrl: './grammar.css',
})
export class Grammar {
  word = signal('');
  results = signal<GrammarResult[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private grammarService: GrammarService) {}

  async onSearch() {
    if (!this.word().trim()) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.results.set([]);

    try {
      const results = await this.grammarService.search(this.word());
      this.results.set(results);
    } catch (err) {
      console.error(err);
      this.error.set('Search failed');
    } finally {
      this.isLoading.set(false);
    }
  }
}
