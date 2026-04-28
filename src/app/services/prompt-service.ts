import { Injectable } from '@angular/core';
import { from, Observable, shareReplay } from 'rxjs';
import { SupabaseService } from './supabase-service';
import { map } from 'rxjs/operators';

export interface Prompt {
  id: number;
  status?: number;
  draft_content?: string;
  createdAt?: Date;
  response_count?: number;
  difficulty?: number;
  category?: string[];
  prompt_title?: string;
  description?: string[];
  questions?: string[];
}

export interface WeeklyPrompt {
  id: number;
  week_start_date: string;
  description: string;
  prompt_id: number;
  prompt_response_count: {
    id: number;
    prompt_title: string;
    response_count: number;
    category: string[];
    difficulty: string;
    questions: string[];
  };
}

export interface DifficultyBreakdown {
  easy: number;
  medium: number;
  hard: number;
}

export interface UserStats {
  totalCompleted: number;
  byDifficulty: DifficultyBreakdown;
}

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private supabase;
  private weeklyPrompt$: Observable<WeeklyPrompt> | null = null;
  private userStats$: Observable<UserStats> | null = null;
  private prompts$: Observable<any> | null = null;

  constructor(private supabaseClient: SupabaseService) {
    this.supabase = supabaseClient.client;
  }

  getPrompts(userId: string) {
    if (!this.prompts$) {
      this.prompts$ = from(
        this.supabase
          .from('prompt_response_count')
          .select(`
            *,
            post_submission!left(status, description)
          `)
          .eq('post_submission.user_id', userId)
          .order('id', { ascending: true })
      ).pipe(
        map(result => (result.data ?? []).map((p: any) => {
          const submission = p.post_submission?.[0];
          return {
            ...p,
            status: submission?.status ?? null,
            draft_content: submission?.status === 0 ? submission.description : null
          };
        })),
        shareReplay(1)
      );
    }
    return this.prompts$;
  }

  getPromptById(id: string | null) {
    return from(
      this.supabase
        .from('prompt_response_count')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  getWeeklyPrompt(): Observable<WeeklyPrompt> {
    if (!this.weeklyPrompt$) {
      const today = new Date().toISOString().split('T')[0];

      this.weeklyPrompt$ = from(
        this.supabase
          .from('weekly_prompt')
          .select(`*, prompt_response_count(*)`)
          .lte('week_start_date', today)
          .order('week_start_date', { ascending: false })
          .limit(1)
          .single()
      ).pipe(
        map(result => result.data as WeeklyPrompt),
        shareReplay(1)
      );
    }

    return this.weeklyPrompt$;
  }

  getUserStats(userId: string) {
    if (!this.userStats$) {
      this.userStats$ = from(
        this.supabase
          .from('post_submission')
          .select(`user_id, status, prompt(difficulty)`)
          .eq('user_id', userId)
          .eq('status', 1)
      ).pipe(
        map(result => {
          const data = result.data as any[];
          return {
            totalCompleted: data.length,
            byDifficulty: {
              easy: data.filter(d => d.prompt?.difficulty === '1').length,
              medium: data.filter(d => d.prompt?.difficulty === '2').length,
              hard: data.filter(d => d.prompt?.difficulty === '3').length,
            }
          } as UserStats;
        }),
        shareReplay(1)
      );
    }
    return this.userStats$;
  }

  resetPrompts() {
    this.prompts$ = null;
  }

  resetStats() {
    this.userStats$ = null;
  }
}
