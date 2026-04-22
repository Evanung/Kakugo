import { Component } from '@angular/core';
import { Feedlist } from '../../components/feed/feedlist/feedlist';
import { FormsModule } from '@angular/forms';
import { WeeklyPromptDashboard } from '../../components/prompts/weekly-prompt-dashboard/weekly-prompt-dashboard';
import { RouterLink } from '@angular/router';
import { PromptStats } from '../../components/prompts/prompt-stats/prompt-stats';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-dashboard',
  imports: [Feedlist, FormsModule, WeeklyPromptDashboard, RouterLink, PromptStats, DatePickerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard {
  date: Date[] | undefined;
}
