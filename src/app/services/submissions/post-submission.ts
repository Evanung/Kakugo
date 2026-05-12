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
  user_id: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
  };
  is_public: boolean;
  status: number;
}

export interface CreatePost {
  prompt_id?: number;
  description: string;
  user_id: string;
  title: string;
  is_public: boolean;
}

export interface SaveDraft {
  prompt_id?: number;
  description: string;
  user_id: string;
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
          profiles(display_name, avatar_url)
        `)
        .eq('prompt_id', promptId)
        .eq('status', 1)
    );
  }

  createPost = async (post: CreatePost) => {
    // Check if a draft exists
    const { data: existing } = await this.supabase
      .from('post_submission')
      .select('id')
      .eq('user_id', post.user_id)
      .eq('prompt_id', post.prompt_id!)
      .eq('status', 0)
      .single();

    if (existing) {
      // Promote draft to submitted
      const { error } = await this.supabase
        .from('post_submission')
        .update({ ...post, status: 1 })
        .eq('id', existing.id);

      if (!error) {
        this.promptService.resetPrompts();
        this.promptService.resetStats();
      }

      return { error };
    } else {
      // No draft, fresh insert
      const { error } = await this.supabase
        .from('post_submission')
        .insert({ ...post, status: 1 });

      if (!error) {
        this.promptService.resetPrompts();
        this.promptService.resetStats();
      }

      return { error };
    }
  }

  toggleVisibility = async (post: Post) => {
    const { error } = await this.supabase
      .from('post_submission')
      .update({ is_public: !post.is_public })
      .eq('id', post.id);

    if (!error) {
      this.promptService.resetPrompts();
      this.promptService.resetStats();
    }
    return { error };
  }

  deletePost =  async (id: number)=>{
    const { error } = await this.supabase
      .from('post_submission')
      .delete()
      .eq('id', id);

    if (!error) {
      this.promptService.resetPrompts();
      this.promptService.resetStats();
    }

    return { error };
  }

  editPost =  async (post: Post, description: string) => {
    const { error } = await this.supabase
      .from('post_submission')
      .update({description: description})
      .eq('id', post.id);
    if (!error) {
      this.promptService.resetPrompts();
      this.promptService.resetStats();
    }
    return { error };
  }
  saveDraft = async (draft: SaveDraft) => {
    const { data: existing } = await this.supabase
      .from('post_submission')
      .select('id')
      .eq('user_id', draft.user_id)
      .eq('prompt_id', draft.prompt_id)
      .eq('status', 0)
      .single();

    const { error } = existing
      ? await this.supabase
        .from('post_submission')
        .update({ description: draft.description })
        .eq('id', existing.id)
      : await this.supabase
        .from('post_submission')
        .insert({ ...draft, status: 0 });

    if (!error) {
      this.promptService.resetPrompts();
    }

    return { error };
  }

  getDraft = async (user_id: string, promptId: number) => {
    const { data, error } = await this.supabase
      .from('post_submission')
      .select('description, status')
      .eq('user_id', user_id)
      .eq('prompt_id', promptId)
      .eq('status', 0)
      .single();

    return { data, error };
  }
}
