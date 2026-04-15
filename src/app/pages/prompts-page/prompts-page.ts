import {Component, signal} from '@angular/core';
import { PromptList } from '../../components/prompts/prompt-list/prompt-list';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-prompts-page',
  imports: [
    PromptList, ButtonModule, CarouselModule, TagModule,
  ],
  templateUrl: './prompts-page.html',
  styleUrl: './prompts-page.css',
})
export class PromptsPage {

}
