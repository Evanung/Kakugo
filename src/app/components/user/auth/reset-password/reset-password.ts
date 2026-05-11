import {Component, inject, signal} from '@angular/core';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {AuthService} from '../../../../services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [
    ButtonDirective,
    ButtonLabel,
    FormsModule,
    InputText
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  private authService = inject(AuthService);
  private router = inject(Router);

  password = signal('');
  confirmPassword = signal('');
  errorMessage = signal('');
  loading = signal(false);


  async updatePassword() {
    this.loading.set(true);
    this.errorMessage.set('');

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Passwords do not match.');
      this.loading.set(false); 
      return;
    }

    try {
      await this.authService.updatePassword(this.password());
      await this.router.navigate(['/auth/login']);
    } catch (err: any) {
      this.errorMessage.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
