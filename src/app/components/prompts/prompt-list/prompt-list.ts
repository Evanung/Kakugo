import { Component, signal, ViewChild, OnInit, inject } from '@angular/core';
import { PromptService, Prompt } from '../../../services/prompt-service';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize} from 'rxjs';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase-service';

@Component({
  selector: 'app-prompt-list',
  imports: [TableModule, TagModule, ButtonModule, IconField, InputIconModule, InputTextModule, SkeletonModule],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.css',
})
export class PromptList implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  searchValue = signal('');
  isSorted: boolean | null = null;
  isLoading: boolean = true;
  selectedPrompt!: Prompt;
  initialValue: Prompt[] = [];
  private router = inject(Router);
  prompts = signal<Prompt[]>([]);

  constructor(
    private promptService: PromptService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const { data: { user } } = await this.supabaseService.client.auth.getUser();

    this.promptService.getPrompts(user!.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: ({ data, error }) => {
          if (error) {
            console.error(error);
            return;
          }

          const prompts = (data ?? []).map(p => ({
            ...p,
            status: p.prompt_status?.length > 0
          }));

          this.initialValue = prompts;
          this.prompts.set(prompts);
          this.isLoading = false;
        }
      });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
    this.prompts.set([...this.initialValue]);
    this.isSorted = null;
  }

  customSort(event: SortEvent) {
    if (this.isSorted === null) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted) {
      this.isSorted = false;
      this.sortTableData(event);
    } else {
      this.isSorted = null;
      this.prompts.set([...this.initialValue]);
      this.dt1.reset();
    }
  }

  sortTableData(event: SortEvent) {
    event.data!.sort((data1, data2) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = 0;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order! * result;
    });
  }

  onRowSelect(event: any) {
    this.router.navigate(['/write', event.data.id]);
  }
}
