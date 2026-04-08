import {Component, signal, inject, booleanAttribute} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService} from '../../../services/auth-service';
import { Router, RouterLink} from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule, ButtonModule, InputTextModule, CardModule,
    CheckboxModule, DividerModule, InputTextModule,
    CarouselModule, CommonModule, RouterLink, ToastModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  display_name = signal('');
  email = signal('');
  password = signal('');
  errorMessage = signal('');
  loading = signal(false);
  confirmPassword = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  async onSignup() {

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }
    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.signUp(this.display_name(),this.email(), this.password());
      await this.router.navigate(['/login-page']);
    } catch (err: any) {
      this.errorMessage.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  features = [
    {
      title: 'Progress Tracking',
      image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-3.jpg',
      darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-3-dark.jpg',
      text: 'Track your writing progress day to day and month to month. See what new grammar and words you have used since last time. The more you write, the more you improve!'
    },
    {
      title: 'Built in grammar and dictionary tools',
      image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-2.jpg',
      darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-2-dark.jpg',
      text: 'Commonly used grammar and words hand picked by us to make sure you are using the right tools for the job'
    },
    {
      title: 'Feedback from Japanese Natives',
      image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-1.jpg',
      darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feature/tab-1-dark.jpg',
      text: 'Through our helpful team, we can help your progress skyrocket. Get various levels of written passages from Japanese natives.'
    }
  ];
}
