import {Component, inject, signal} from '@angular/core';
import {Divider} from 'primeng/divider';
import {NgClass} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {AccountService} from '../../services/user/account-service';
import {FileUploadHandlerEvent} from 'primeng/fileupload';

@Component({
  selector: 'app-settings',
  imports: [
    Divider,
    NgClass,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage {

  items: any[] = [
    {
      label: 'AccountService',
      icon: 'pi pi-cog'
    },
    {
      label: 'Billing',
      icon: 'pi pi-sun'
    },

  ];

  selectedNav: string = 'Dashboard';
}
