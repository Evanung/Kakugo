import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  client: SupabaseClient;

  private authReady$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        }
      }
    );

    // fires once Supabase has read from localStorage
    this.client.auth.onAuthStateChange((event, session) => {
      console.log('AUTH EVENT:', event);
      console.log('AUTH SESSION:', session);
      if (event === 'INITIAL_SESSION') {
        this.authReady$.next(true); // signal that auth is ready
      }
    });
  }

  async waitForAuthReady() {
    await firstValueFrom(this.authReady$.pipe(filter(ready => ready)));
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
