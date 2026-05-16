import {Component, Input, signal} from '@angular/core';
import {Prompt } from '../../../services/prompt-service';
import {Skeleton} from "primeng/skeleton";

@Component({
  selector: 'app-prompt-info',
    imports: [
        Skeleton
    ],
  templateUrl: './prompt-info.html',
  styleUrl: './prompt-info.css',
})
export class PromptInfo {
  @Input() prompt: Prompt | null = null;
  isLoading = signal(true);

  ngOnChanges() {
    if (this.prompt) this.isLoading.set(false);
  }
}
