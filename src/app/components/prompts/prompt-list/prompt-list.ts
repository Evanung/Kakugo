import { Component, signal, ViewChild, inject } from '@angular/core';
import { PromptService, Prompt } from '../../../services/prompt-service';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {filter} from 'rxjs/operators';
import {AuthService} from '../../../services/auth-service';
@Component({
  selector: 'app-prompt-list',
  imports: [TableModule, TagModule, ButtonModule, IconField, InputIconModule, InputTextModule, SkeletonModule, AsyncPipe],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.css',
})

export class PromptList {
  private promptService = inject(PromptService);
  private authService = inject(AuthService);
  private router = inject(Router);
  originalOrder: Prompt[] = [];

  @ViewChild('dt1') dt1!: Table;
  searchValue = signal('');
  isSorted: boolean | null = null;
  selectedPrompt!: Prompt;
  skeletonRows = Array(5).fill({ loading: true });
  cachedPrompts: Prompt[] = []; // keep a local copy for sort reset

  prompts$ = this.authService.currentUser$.pipe(
    filter(user => user !== null),
    switchMap(user => this.promptService.getPrompts(user!.id)),
    tap(prompts => {
      this.cachedPrompts = prompts;
      this.originalOrder = [...prompts];
    })
  );

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
    this.isSorted = null;
    if (this.dt1?.value) {
      this.dt1.value.splice(0, this.dt1.value.length, ...this.originalOrder);
    }
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(value, 'contains');
    this.searchValue.set(value);
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
      event.data!.splice(0, event.data!.length, ...this.originalOrder);
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
