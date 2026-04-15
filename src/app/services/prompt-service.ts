import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { SupabaseService } from './supabase-service';

export interface Prompt {
  id: number;
  status?: boolean;
  createdAt?: Date;
  responses?: number;
  difficulty?: number;
  category?: string[];
  prompt_title?: string;
  description?: string[];
  questions?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private supabase;

  constructor(private supabaseClient: SupabaseService) {
    this.supabase = supabaseClient.client;
  }

  getPrompts(userId: string) {
    return from(
      this.supabase
        .from('prompt')
        .select(`
        *,
        prompt_status!left(completed_at)
      `)
        .eq('prompt_status.user_id', userId)
        .order('id', { ascending: true })
    );
  }

  getPromptById(id: string | null) {
    return from(
      this.supabase
      .from('prompt')
        .select('*')
        .eq('id', id)
        .single()
    )
  }
}
