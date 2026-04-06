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
  prompts = signal<any>([1,2,3,4,5,6]);
  responsiveOptions: any[] | undefined;

}
