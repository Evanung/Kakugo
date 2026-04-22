import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PromptService } from '../../../services/prompt-service';
import { SupabaseService } from '../../../services/supabase-service';
import { from, switchMap } from 'rxjs';
import { UserStats } from '../../../services/prompt-service';

@Component({
  selector: 'app-prompt-stats',
  imports: [AsyncPipe],
  templateUrl: './prompt-stats.html',
  styleUrl: './prompt-stats.css',
})
export class PromptStats {
  private promptService = inject(PromptService);
  private supabaseService = inject(SupabaseService);

  userStats$ = from(this.supabaseService.client.auth.getUser()).pipe(
    switchMap(({ data: { user } }) =>
      this.promptService.getUserStats(user!.id)
    )
  );
}
