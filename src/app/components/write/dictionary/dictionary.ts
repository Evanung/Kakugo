import { Component, signal} from '@angular/core';
import { InputText } from "primeng/inputtext";
import {DictionaryService, GlossResult, KanjiResult} from '../../../services/dictionary-service';
import {FormsModule} from '@angular/forms';
import {SupabaseService} from '../../../services/supabase-service';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';

@Component({
  selector: 'app-dictionary',
  imports: [
    InputText,
    FormsModule,
    Button,
    IconField,
    InputIcon,
  ],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.css',
})
export class Dictionary {
  word = signal('');
  englishResults = signal<GlossResult[]>([]);
  japaneseResults = signal<KanjiResult[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private dictionaryService: DictionaryService) {}

  async onSearch() {
    if (!this.word().trim()) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.englishResults.set([]);
    this.japaneseResults.set([]);

    try {
      const result = await this.dictionaryService.search(this.word());
      this.englishResults.set(result.english);
      this.japaneseResults.set(result.japanese);
    } catch (err) {
      console.error(err);
      this.error.set('Search failed');
    } finally {
      this.isLoading.set(false);
    }
  }

}
