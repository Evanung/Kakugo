import { Component, signal, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService} from '../../../../services/auth-service';
import {Router, RouterLink} from '@angular/router';
import { CardModule } from 'primeng/card';
import { MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule, ButtonModule, InputTextModule, CardModule,
    CheckboxModule, DividerModule, InputTextModule,
    CarouselModule, CommonModule, RouterLink, Toast,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  providers: [MessageService]
})
export class SignUp {
  private authService = inject(AuthService);

  constructor(private router: Router) {}
  display_name = signal('');
  email = signal('');
  password = signal('');
  errorMessage = signal('');
  loading = signal(false);
  confirmPassword = signal('');


  async onSignup() {
    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }
    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.signUp(this.display_name(),this.email(), this.password());
      await this.router.navigate(['/auth/login']);
    } catch (err: any) {
      this.errorMessage.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
