import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Dashboard
  },
  {
    path: 'write-page',
    loadComponent: () => import('./pages/write-page/write-page')
      .then(m => m.WritePage),
  },
  {
    path: 'prompts-page',
    loadComponent: () => import('./pages/prompts-page/prompts-page')
      .then(m => m.PromptsPage),
  },
  {
    path: 'discussion-page',
    loadComponent: () => import('./pages/discussion-page/discussion-page')
    .then(m => m.DiscussionPage),
  },
  {
    path: 'learn-page',
    loadComponent: () => import('./pages/learn-page/learn-page')
    .then(m => m.LearnPage),
  }
];
