import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService} from '../../../../services/auth-service';
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
      await this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.errorMessage.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
