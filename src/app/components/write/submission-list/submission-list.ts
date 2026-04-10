import { Component, input, OnInit } from '@angular/core';
import {Avatar} from "primeng/avatar";
import { Post, PostSubmission } from '../../../services/submissions/post-submission';
import { PromptService, Prompt } from '../../../services/prompt-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submission-list',
    imports: [
        Avatar, CommonModule
    ],
  templateUrl: './submission-list.html',
  styleUrl: './submission-list.css',
})
export class SubmissionList implements OnInit {
  prompt = input.required<Prompt>();
  posts: Post[] = [];

  constructor(private postSubmissionService: PostSubmission) {}

  ngOnInit() {
    this.postSubmissionService.getPostsFromPromptID(this.prompt().id)
      .subscribe(({ data, error }) => {
        this.posts = data ?? [];
      });
  }
}
