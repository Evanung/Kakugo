import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
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
    { label: 'Dashboard', route: '/' },
    { label: 'Write', route: '/write'},
    { label: 'Prompts', route: '/prompts' },
    { label: 'Discussion', route: '/discussion' },
    { label: 'Learn', route: '/learn' }
  ]);

  setActiveItem = (index: number): void => {
    this.activeItem.set(index);
  };
}
