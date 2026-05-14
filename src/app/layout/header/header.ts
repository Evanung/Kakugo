import { CommonModule } from '@angular/common';
import {Component, computed, inject, signal} from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {SupabaseService} from '../../services/supabase-service';
import {Avatar} from 'primeng/avatar';
import {AccountService} from '../../services/user/account-service';
import {AuthService} from '../../services/auth-service';
import {take} from 'rxjs';
import {filter} from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [CommonModule, StyleClassModule, RouterLinkActive, RouterLink, Avatar, Menu],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  protected accountService = inject(AccountService);
  private authService = inject(AuthService);
  profile$ = this.accountService.profile$;

  private _loadProfile = this.authService.currentUser$.pipe(
    filter(user => user !== null),
    take(1)
  ).subscribe(user => this.accountService.loadProfile(user!.id));


  activeItem = signal<number>(0);

  menuItems = signal<MenuItem[]>([
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Write', routerLink: '/write'},
    { label: 'Prompts', routerLink: '/prompts' },
    { label: 'Discussion', routerLink: '/discussion' },
    { label: 'Learn', routerLink: '/learn' }
  ]);

  profileItems = computed<MenuItem[]>(() => [
    { label: 'Profile (Coming Soon)', icon: 'pi pi-user'},
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', linkClass: '!text-red-500 dark:!text-red-400', command: () => this.logout() }
  ]);

  async logout() {
    await this.authService.logout();
  }
}
