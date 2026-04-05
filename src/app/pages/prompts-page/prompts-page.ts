import {Component, signal} from '@angular/core';
import { PromptList} from '../../components/prompts/prompt-list/prompt-list';

@Component({
  selector: 'app-prompts-page',
  imports: [
    PromptList
  ],
  templateUrl: './prompts-page.html',
  styleUrl: './prompts-page.css',
})
export class PromptsPage {


}
