import { Injectable } from '@angular/core';
import {SupabaseService} from '../supabase-service';
import { from } from 'rxjs';

export interface Post {
  id: number;
  prompt_id: number;
  createdAt?: Date;
  title: string;
  description: string;
  userID: number;

}

@Injectable({
  providedIn: 'root',
})
export class PostSubmission {
  private supabase;

  constructor(private supabaseClient: SupabaseService) {
      this.supabase = supabaseClient.client;
  }
  getPostsFromPromptID = (promptId: number) => {
    return from(
      this.supabase
        .from('post_submission')
        .select('*')
        .eq('prompt_id', promptId)
    );
  }
}
