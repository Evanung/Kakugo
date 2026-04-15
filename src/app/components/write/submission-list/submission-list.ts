import { Component, input, OnInit, effect } from '@angular/core';
import {Avatar} from "primeng/avatar";
import { Post, PostSubmission } from '../../../services/submissions/post-submission';
import { Prompt } from '../../../services/prompt-service';
import { CommonModule } from '@angular/common';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-submission-list',
    imports: [
        Avatar, CommonModule
    ],
  templateUrl: './submission-list.html',
  styleUrl: './submission-list.css',
})
export class SubmissionList {
  prompt = input.required<Prompt>();
  refresh = input<number>(0);
  posts: Post[] = [];

  constructor(private postSubmissionService: PostSubmission) {
    effect(() => {
      const _ = this.refresh();
      this.loadPosts();
    });
  }

  loadPosts() {
    this.postSubmissionService.getPostsFromPromptID(this.prompt().id)
      .subscribe(({ data, error }) => {
        this.posts = data ?? [];
      });
  }
}
