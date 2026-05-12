import { CommonModule } from '@angular/common';
import {Component, inject, signal} from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {SupabaseService} from '../../services/supabase-service';
import {Avatar} from 'primeng/avatar';
import {AccountService} from '../../services/user/account-service';
import {AuthService} from '../../services/auth-service';
import {take} from 'rxjs';
import {filter} from 'rxjs/operators';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, StyleClassModule, RouterLinkActive, RouterLink, Avatar],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  protected accountService = inject(AccountService);
  private authService = inject(AuthService);
  profile$ = this.accountService.profile$;

  avatarUrl = signal<string>('');
  private _loadProfile = this.authService.currentUser$.pipe(
    filter(user => user !== null),
    take(1)
  ).subscribe(user => this.accountService.loadProfile(user!.id));


  activeItem = signal<number>(0);

  menuItems = signal<MenuItem[]>([
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Write', route: '/write'},
    { label: 'Prompts', route: '/prompts' },
    { label: 'Discussion', route: '/discussion' },
    { label: 'Learn', route: '/learn' }
  ]);

  setActiveItem = (index: number): void => {
    this.activeItem.set(index);
  };
}
