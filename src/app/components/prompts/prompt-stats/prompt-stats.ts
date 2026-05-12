import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PromptService } from '../../../services/prompt-service';
import { SupabaseService } from '../../../services/supabase-service';
import { switchMap } from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-prompt-stats',
  imports: [AsyncPipe],
  templateUrl: './prompt-stats.html',
  styleUrl: './prompt-stats.css',
})
export class PromptStats {
  private promptService = inject(PromptService);
  private supabaseService = inject(SupabaseService);

  userStats$ = this.supabaseService.currentUser$.pipe(
    filter(user => user !== null),
    switchMap(user => this.promptService.getUserStats(user!.id))
  );
}
