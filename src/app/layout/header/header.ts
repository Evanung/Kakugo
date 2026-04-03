import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, StyleClassModule, RouterLinkActive, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  activeItem = signal<number>(0);

  menuItems = signal<MenuItem[]>([
    { label: 'Dashboard', icon: 'pi-th-large', route: '/' },
    { label: 'Write', icon: 'pi-pencil', route: '/write-page'},
    { label: 'Prompts', icon: 'pi-list', route: '/prompts-page' },
    { label: 'Discussion', icon: 'pi-comments', route: '/discussion-page' },
    { label: 'Learn', icon: 'pi-clone', route: '/learn-page' }
  ]);

  setActiveItem = (index: number): void => {
    this.activeItem.set(index);
  };
}
