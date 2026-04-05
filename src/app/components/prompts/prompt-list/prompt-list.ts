import { Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

interface prompts {
  status: boolean;
  title: string;
  difficulty: string;
  responses: number;
}


@Component({
  selector: 'app-prompt-list',
  imports: [TableModule, TagModule],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.css',
})
export class PromptList {
  prompt = signal<prompts[]>([
    {
      status: true,
      title: "Describe your daily routine",
      difficulty: "Easy",
      responses: 10
    },
    {
      status: false,
      title: "Why did you start learning Japanese?",
      difficulty: "Easy",
      responses: 54
    },
    {
      status: false,
      title: "Introduce something from your culture to someone who has never been",
      difficulty: "Medium",
      responses: 5
    },
    {
      status: true,
      title: "Write a business email apologizing to your boss for a mistake",
      difficulty: "Hard",
      responses: 13
    }
  ]);
}
