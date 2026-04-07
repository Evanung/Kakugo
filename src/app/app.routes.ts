import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './services/auth-guard';
import {Login} from './pages/user-pages/login/login';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: Dashboard
  },
  {
    path: 'write-page',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/write-page/write-page')
      .then(m => m.WritePage),
  },
  {
    path: 'prompts-page',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/prompts-page/prompts-page')
      .then(m => m.PromptsPage),
  },
  {
    path: 'discussion-page',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/discussion-page/discussion-page')
    .then(m => m.DiscussionPage),
  },
  {
    path: 'learn-page',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/learn-page/learn-page')
    .then(m => m.LearnPage),
  },
  {
    path: 'login-page',
    data: { hideLayout: true },
    component: Login
  }
  ,
  {
    path: 'signup-page',
    data: { hideLayout: true },
    loadComponent: () => import('./pages/user-pages/sign-up/sign-up')
      .then(m => m.SignUp),
  }
];
