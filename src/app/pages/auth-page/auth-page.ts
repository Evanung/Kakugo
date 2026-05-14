import {Component} from '@angular/core';
import {Carousel} from "primeng/carousel";
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-auth-page',
  imports: [
    Carousel,
    FormsModule,
    RouterOutlet,
    Toast
  ],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
  providers: [MessageService],
})
export class AuthPage {

  features = [
    {
      title: 'Quality Curated Prompts',
      image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-3.jpg',
      darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-3-dark.jpg',
      text: 'Tons of prompts to choose from to help you naturally learn vocab and grammar.'
    },
    {
      title: 'Built in grammar and dictionary tools',
      image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-2.jpg',
      darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-2-dark.jpg',
      text: 'Commonly used grammar and words hand picked by us to make sure you are using the right tools for the job.'
    },
    {
      title: 'Feedback from Natives Speakers',
      image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-1.jpg',
      darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-1-dark.jpg',
      text: 'Through our helpful team, we can help your progress skyrocket. Get various levels of written passages from Native speakers.'
    },
    {
      title: 'Progress Tracking',
      image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-3.jpg',
      darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-3-dark.jpg',
      text: 'Track your writing progress day to day and month to month. See what new grammar and words you have used since last time. The more you write, the more you improve!'
    },
  ];
}
