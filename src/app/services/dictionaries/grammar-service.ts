import { Injectable } from '@angular/core';
import { SupabaseClient, createClient} from '@supabase/supabase-js';
import {environment} from '../../../environment/environment';

export interface GrammarResult {
  id: number;
  jlpt_level: string;
  grammar: string;
  furigana_reading: string;
  meaning: string;
}
@Injectable({
  providedIn: 'root',
})
export class GrammarService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async search(query: string): Promise<GrammarResult[]> {
    const { data, error } = await this.supabase
      .rpc('search_grammar', { query });

    if (error) throw error;
    return (data ?? []) as GrammarResult[];
  }
}
