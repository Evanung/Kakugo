import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';

export interface Gloss {
  gloss: string;
}

export interface Sense {
  pos: string[];
  field: string[];
  glosses?: Gloss[];
}

export interface Entry {
  id: string;
  common: boolean;
  kanji: { form: string; common: boolean }[];
  readings: { reading: string; common: boolean }[];
  senses?: (Sense & { glosses: Gloss[] })[];
}

export interface GlossResult {
  gloss: string;
  entry_id: string;
  entry_common: boolean;
  pos: string[];
  field: string[];
  kanji: { form: string; common: boolean }[] | null;
  readings: { reading: string; common: boolean }[] | null;
}

export interface KanjiResult {
  form: string;
  entry: Entry & {
    senses: (Sense & { glosses: Gloss[] })[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async searchByEnglish(query: string): Promise<GlossResult[]> {
    const { data, error } = await this.supabase
      .rpc('search_english', { query });

    if (error) throw error;
    return (data ?? []) as GlossResult[];
  }

  async searchByJapanese(query: string): Promise<KanjiResult[]> {
    const { data, error } = await this.supabase
      .from('kanji_forms')
      .select(`
        form,
        entry:entries (
          id, common,
          readings(reading, common),
          senses(pos, field, glosses(gloss))
        )
      `)
      .ilike('form', `${query}%`)
      .order('common', { ascending: false })
      .limit(20);

    if (error) throw error;
    return (data ?? []) as unknown as KanjiResult[];
  }

  async search(query: string): Promise<{
    english: GlossResult[];
    japanese: KanjiResult[];
  }> {
    const isJapanese = /[\u3000-\u9fff\uff00-\uffef]/.test(query);

    if (isJapanese) {
      const japanese = await this.searchByJapanese(query);
      return { english: [], japanese };
    } else {
      const english = await this.searchByEnglish(query);
      return { english, japanese: [] };
    }
  }
}
