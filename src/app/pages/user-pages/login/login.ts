import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService} from '../../../services/auth-service';
import {Router, RouterLink} from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ButtonModule, CarouselModule, CheckboxModule, DividerModule, InputTextModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  checked2: boolean = true;
  email = signal('');
  password = signal('');
  errorMessage = signal('');
  loading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.login(this.email(), this.password());
      this.router.navigate(['/']); // redirect after login
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
