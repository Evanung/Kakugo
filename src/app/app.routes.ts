import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { WritePage } from './pages/write-page/write-page';
import { PromptsPage } from './pages/prompts-page/prompts-page';
import {DiscussionPage} from './pages/discussion-page/discussion-page';
import {LearnPage} from './pages/learn-page/learn-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Dashboard
  },
  {
    path: 'write-page',
    component: WritePage
  },
  {
    path: 'prompts-page',
    component: PromptsPage
  },
  {
    path: 'discussion-page',
    component: DiscussionPage
  },
  {
    path: 'learn-page',
    component: LearnPage
  }
];
