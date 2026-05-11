import { Component } from '@angular/core';
import {Divider} from 'primeng/divider';
import {NgClass} from '@angular/common';
import {Textarea} from 'primeng/textarea';
import {InputGroup} from 'primeng/inputgroup';
import {InputText} from 'primeng/inputtext';
import {FileUpload} from 'primeng/fileupload';
import {Button} from 'primeng/button';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {RouterLink, RouterOutlet} from '@angular/router';

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
      label: 'Account',
      icon: 'pi pi-cog'
    },
    {
      label: 'Billing',
      icon: 'pi pi-sun'
    },

  ];

  selectedNav: string = 'Dashboard';
}
