import {Component, inject, signal} from '@angular/core';
import {Button} from "primeng/button";
import {FileUpload, FileUploadHandlerEvent} from "primeng/fileupload";
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputText} from "primeng/inputtext";
import {Textarea} from "primeng/textarea";
import {AuthService} from '../../../../services/auth-service';
import {AccountService} from '../../../../services/user/account-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    FileUpload,
    InputGroup,
    InputGroupAddon,
    InputText,
    Textarea,
    Avatar
  ],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);

  avatarUrl = signal<string>('');
  uploading = signal<boolean>(false);

  constructor() {
    this.accountService.profile$.pipe(takeUntilDestroyed()).subscribe(profile => {
      this.avatarUrl.set(this.accountService.getAvatarUrl(profile?.avatar_url ?? null));
    });
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
}
