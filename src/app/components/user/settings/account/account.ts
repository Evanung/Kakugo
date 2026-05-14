import {Component, inject, signal} from '@angular/core';
import {Button} from "primeng/button";
import {FileUpload, FileUploadHandlerEvent} from "primeng/fileupload";
import {InputText} from "primeng/inputtext";
import {AuthService} from '../../../../services/auth-service';
import {AccountService} from '../../../../services/user/account-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Avatar} from 'primeng/avatar';
import {Divider} from 'primeng/divider';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SupabaseService} from '../../../../services/supabase-service';
import {FormsModule} from '@angular/forms';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    FileUpload,
    InputText,
    Avatar,
    Divider,
    Toast,
    FormsModule,
    ConfirmDialog
  ],
  templateUrl: './account.html',
  styleUrl: './account.css',
  providers: [MessageService, ConfirmationService]
})
export class Account {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private messageService = inject(MessageService);
  private supabaseService = inject(SupabaseService);
  private confirmationService = inject(ConfirmationService);

  avatarUrl = signal<string>('');
  displayName = signal<string>('');
  uploading = signal<boolean>(false);

  newUsername = signal<string>('');

  currentPassword = signal<string>('');
  newPassword = signal<string>('');
  resetting = signal<boolean>(false);

  deletePassword = signal<string>('');


  constructor() {
    this.accountService.profile$.pipe(takeUntilDestroyed()).subscribe(profile => {
      this.avatarUrl.set(this.accountService.getAvatarUrl(profile?.avatar_url ?? null));
      this.displayName.set(profile?.display_name ?? '');
    });

  }

  async resetPassword() {
    if (!this.newPassword || !this.currentPassword) {
      this.messageService.add({ severity: 'info', summary: 'Password Reset', detail: 'Please enter your both passwords' });
      return;
    }
    if (this.newPassword().length < 8) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password must be at least 8 characters' });
      return;
    }
    this.resetting.set(true);

    try {
      const email = this.authService.currentUser$.value?.email;
      if (!email) {
        return;
      }

      const { error: signInError } = await this.supabaseService.signIn(email, this.currentPassword());
      if (signInError) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Password is incorrect'});
      }
      await this.authService.updatePassword(this.newPassword());
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Password Updated'});
      this.currentPassword.set('');
      this.newPassword.set('');
    } catch (error) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not update password'});
    } finally {
      this.resetting.set(false);
    }
  }

  async onAvatarUpload(event: FileUploadHandlerEvent) {
    const file = event.files[0];
    if (!file) return;

    const userId = this.authService.currentUser$.value?.id;
    if (!userId) return;

    this.uploading.set(true);
    try {
      await this.accountService.uploadAvatar(file, userId);
    } finally {
      this.uploading.set(false);
    }
  }

  async updateUsername() {
    if (!this.newUsername()) {
      this.messageService.add({ severity: 'error', summary: 'Username', detail: 'Please enter a new username' });
      return;
    }
    const name = this.newUsername().trim();
    if (!name) return;

    const userId = this.authService.currentUser$.value?.id;
    if (!userId) return;

    this.resetting.set(true);

    try {
      await this.accountService.updateUsername(userId, name);
      this.displayName.set(name);
      this.newUsername.set('');
      this.messageService.add({ severity: 'success', summary: 'Username updated', detail: 'You can update it again in 30 days' });
    } catch (e: any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e.message });
    } finally {
      this.resetting.set(false);
    }
  }

  confirmDelete() {
    if (!this.deletePassword){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter the current password to delete the account' });
      return;
    }

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your account? This cannot be undone.',
      header: 'Delete Account',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      accept: () => this.deleteAccount()
    });
  }
  async deleteAccount() {
    const email = this.authService.currentUser$.value?.email;
    if (!email) return;


    const { error } = await this.supabaseService.signIn(email, this.deletePassword());
    if (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect Password' });
      return;
    }

    this.resetting.set(true);

    try {
      await this.authService.logout();
      await this.accountService.deleteAccount();
    } catch (e: any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e.message });
    } finally {
      this.resetting.set(false);
    }
  }
}
