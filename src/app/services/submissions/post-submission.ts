import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase-service';
import { from } from 'rxjs';
import { PromptService } from '../prompt-service';

export interface Post {
  id: number;
  promptId?: number;
  createdAt?: Date;
  title: string;
  description: string;
  userID: number;
  profiles: {
    display_name: string;
  };
  is_public: boolean;
}

export interface CreatePost {
  prompt_id?: number;
  description: string;
  user_id: string;
  title: string;
  is_public: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PostSubmission {
  private supabase;

  constructor(
    private supabaseClient: SupabaseService,
    private promptService: PromptService
  ) {
    this.supabase = supabaseClient.client;
  }

  getPostsFromPromptID = (promptId: number) => {
    return from(
      this.supabase
        .from('post_submission')
        .select(`
          *,
          profiles(display_name)
        `)
        .eq('prompt_id', promptId)
    );
  }

  createPost = async (post: CreatePost) => {
    const { error } = await this.supabase
      .from('post_submission')
      .insert(post);

    if (!error) {
      this.promptService.resetPrompts();
    }

    return { error }; // return error so the caller can handle it
  }
}
