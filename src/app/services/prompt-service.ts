import { Injectable,signal } from '@angular/core';
import { from, Observable, shareReplay } from 'rxjs';
import { SupabaseService } from './supabase-service';
import {map} from 'rxjs/operators';

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

export interface WeeklyPrompt {
  id?: string;
  prompt_id?: string;
  week_start_date?: string;
  description?: string;
  created_at?: string;
  prompt?: Prompt;
}

export interface DifficultyBreakdown {
  easy: string;
  medium: string;
  hard: string;
}

export interface UserStats {
  totalCompleted: number;
  byDifficulty: DifficultyBreakdown;
}

export interface PromptStatus {
  completed_at: string;
  prompt: {
    difficulty: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private supabase;
  private weeklyPrompt$: Observable<WeeklyPrompt> | null = null;
  private userStats$: Observable<UserStats> | null = null;

  weeklyPrompt = signal<WeeklyPrompt | null>(null);

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

  getWeeklyPrompt(): Observable<WeeklyPrompt> {
    if (!this.weeklyPrompt$) {
      const today = new Date().toISOString().split('T')[0];

      this.weeklyPrompt$ = from(
        this.supabase
          .from('weekly_prompt')
          .select(`*, prompt(*)`)
          .lte('week_start_date', today)
          .order('week_start_date', { ascending: false })
          .limit(1)
          .single()
      ).pipe(
        map(result => result.data as WeeklyPrompt),
        shareReplay(1)  // caches the last emitted value
      );
    }

    return this.weeklyPrompt$;
  }


  getUserStats(userId: string) {
    if (!this.userStats$) {
      this.userStats$ = from(
        this.supabase
          .from('prompt_status')
          .select(`completed_at, prompt(difficulty)`)
          .eq('user_id', userId)
      ).pipe(
        map(result => {
          const data = result.data as unknown as PromptStatus[];
          return {
            totalCompleted: data.length,
            byDifficulty: {
              easy: data.filter(d => d.prompt.difficulty === '1').length,
              medium: data.filter(d => d.prompt.difficulty === '2').length,
              hard: data.filter(d => d.prompt.difficulty === '3').length,
            }
          } as unknown as UserStats;
        }),
        shareReplay(1)
      );
    }
    return this.userStats$;
  }
}

