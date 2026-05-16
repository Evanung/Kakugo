import {Component, inject} from '@angular/core';
import {PromptService} from '../../../services/prompt-service';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'app-weekly-prompt-dashboard',
  imports: [
    RouterLink,
    AsyncPipe,
    Skeleton
  ],
  templateUrl: './weekly-prompt-dashboard.html',
  styleUrl: './weekly-prompt-dashboard.css',
})

export class WeeklyPromptDashboard {
  private promptService = inject(PromptService);

  weeklyPrompt$ = this.promptService.getWeeklyPrompt();



}
