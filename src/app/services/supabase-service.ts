import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
  signIn(email: string, password: string) {
    return this.client.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.client.auth.signOut();
  }

  signUp(display_name: string, email: string, password: string) {
    return this.client.auth.signUp({ email, password,
      options: {
        data: {
          display_name: display_name
        }
      }
    });
  }
  getSession() {
    return this.client.auth.getSession();
  }
}
