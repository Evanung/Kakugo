import {Component, signal} from '@angular/core';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {AuthService} from '../../../../services/auth-service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ButtonDirective,
    ButtonLabel,
    FormsModule,
    InputText,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email = signal('');
  errorMessage = signal('');
  loading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  async resetPassword() {
    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.resetPassword(this.email());
      this.errorMessage.set('Check your email for a reset link.');
    } catch (err: any) {
      this.errorMessage.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
