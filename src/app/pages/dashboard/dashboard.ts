import { Component } from '@angular/core';
import { Feedlist } from '../../components/feed/feedlist/feedlist';
import { FormsModule } from '@angular/forms';
import { WeeklyPromptDashboard } from '../../components/prompts/weekly-prompt-dashboard/weekly-prompt-dashboard';
import { DatePickerModule } from 'primeng/datepicker';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Feedlist, FormsModule, WeeklyPromptDashboard, DatePickerModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard {
  date: Date[] | undefined;
}
