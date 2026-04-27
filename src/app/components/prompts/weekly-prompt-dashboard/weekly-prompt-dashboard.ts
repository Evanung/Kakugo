import {Component, inject} from '@angular/core';
import {PromptService} from '../../../services/prompt-service';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-weekly-prompt-dashboard',
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './weekly-prompt-dashboard.html',
  styleUrl: './weekly-prompt-dashboard.css',
})

export class WeeklyPromptDashboard {
  private promptService = inject(PromptService);

  weeklyPrompt$ = this.promptService.getWeeklyPrompt();



}
