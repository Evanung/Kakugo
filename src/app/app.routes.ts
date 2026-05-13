import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './services/guards/auth-guard';
import { RecoveryGuard } from './services/guards/recovery-guard';
import {Login} from './components/user/auth/login/login';
import {LandingPage} from './pages/landing-page/landing-page';
import {AuthPage} from './pages/auth-page/auth-page';

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
    path: 'privacy-policy',
    data: { hideNav: true },
    loadComponent: () => import('./pages/legal/privacy-policy-page/privacy-policy-page')
      .then(m => m.PrivacyPolicyPage),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/settings-page/settings-page')
      .then(m => m.SettingsPage),
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', loadComponent: () => import('./components/user/settings/account/account').then(m => m.Account)},
      { path: 'billing', loadComponent: () => import('./components/user/settings/billing/billing').then(m => m.Billing)}
    ]
  },
  {
    path: 'auth',
    data: { hideFooter: true, hideNav: true },
    component: AuthPage,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: Login, data: { hideFooter: true, hideNav: true }, },
      { path: 'sign-up', data: { hideFooter: true, hideNav: true }, loadComponent: () => import('./components/user/auth/sign-up/sign-up').then(m => m.SignUp) },
      { path: 'forgot-password', data: { hideFooter: true, hideNav: true }, loadComponent: () => import('./components/user/auth/forgot-password/forgot-password').then(m => m.ForgotPassword) },
      { path: 'reset-password', data: { hideFooter: true, hideNav: true } , canActivate: [RecoveryGuard], loadComponent: () => import('./components/user/auth/reset-password/reset-password').then(m => m.ResetPassword) }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: Dashboard
  },
];
