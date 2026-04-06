import { Component, signal, ViewChild } from '@angular/core';
import { TableModule, Table} from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconField} from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FilterService } from 'primeng/api';

interface prompts {
  status: boolean;
  title: string;
  difficulty: string;
  responses: number;
}


@Component({
  selector: 'app-prompt-list',
  imports: [TableModule, TagModule, ButtonModule, IconField, InputIconModule, InputTextModule],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.css',
})
export class PromptList {
  @ViewChild('dt1') dt1!: Table;
  searchValue = signal('');
  isSorted: boolean | null = null

  initialValue: prompts[] = [
    { status: true, title: "Describe your daily routine", difficulty: "Easy", responses: 10 },
    { status: false, title: "Why did you start learning Japanese?", difficulty: "Easy", responses: 54 },
    { status: false, title: "Introduce something from your culture to someone who has never been", difficulty: "Medium", responses: 5 },
    { status: true, title: "Write a business email apologizing to your boss for a mistake", difficulty: "Hard", responses: 13 }
  ];

  prompt = signal<prompts[]>([...this.initialValue]);

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
    this.prompt.set([...this.initialValue]);
    this.isSorted = null;
  }

  // Check whether the table is sorted
  customSort(event: SortEvent) {
    if (this.isSorted === null) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted) {
      this.isSorted = false;
      this.sortTableData(event);
    } else {
      this.isSorted = null;
      this.prompt.set([...this.initialValue]);
      this.dt1.reset();
    }
  }
  // Sorts table based on logic
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
}
