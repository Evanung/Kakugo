import { Component } from '@angular/core';
import { Feedlist } from '../../components/feed/feedlist/feedlist';
import { FormsModule } from '@angular/forms';
import { WeeklyPromptDashboard } from '../../components/prompts/weekly-prompt-dashboard/weekly-prompt-dashboard';
import { DatePickerModule } from 'primeng/datepicker';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Feedlist, FormsModule, WeeklyPromptDashboard, DatePickerModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard {
  date: Date[] | undefined;
}
