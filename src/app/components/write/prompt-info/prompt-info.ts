import {Component, Input} from '@angular/core';
import {Prompt} from '../../../services/prompt-service';

@Component({
  selector: 'app-prompt-info',
  imports: [],
  templateUrl: './prompt-info.html',
  styleUrl: './prompt-info.css',
})
export class PromptInfo {
  @Input() prompt!: Prompt;
}
