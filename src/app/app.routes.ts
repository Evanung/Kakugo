import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './services/auth-guard';
import {Login} from './pages/user-pages/login/login';
import {LandingPage} from './pages/landing-page/landing-page';

export const routes: Routes = [
  {
    path: '',
    data: { hideNav: true },
    pathMatch: 'full',
    component: LandingPage,
  },
  {
    path: 'write/:id',
    data: { hideFooter: true, hideNav: true },
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/write-page/write-page')
      .then(m => m.WritePage),
  },
  {
    path: 'write',
    data: { hideFooter: true, hideNav: true },
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/write-page/write-page')
      .then(m => m.WritePage),
  },
  {
    path: 'prompts',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/prompts-page/prompts-page')
      .then(m => m.PromptsPage),
  },
  {
    path: 'discussion',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/discussion-page/discussion-page')
    .then(m => m.DiscussionPage),
  },
  {
    path: 'learn',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/learn-page/learn-page')
    .then(m => m.LearnPage),
  },
  {
    path: 'login-page',
    data: { hideFooter: true, hideNav: true },
    component: Login
  }
  ,
  {
    path: 'signup',
    data: { hideFooter: true, hideNav: true },
    loadComponent: () => import('./pages/user-pages/sign-up/sign-up')
      .then(m => m.SignUp),
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: Dashboard
  },
];
