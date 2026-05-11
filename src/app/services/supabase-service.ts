import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  client: SupabaseClient;

  private authReady$ = new BehaviorSubject<boolean>(false);
  currentUser$ = new BehaviorSubject<User | null>(null);

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

    this.client.auth.onAuthStateChange((event, session) => {
      console.log('AUTH EVENT:', event);
      console.log('AUTH SESSION:', session);
      this.currentUser$.next(session?.user ?? null); // keep user in sync
      if (event === 'INITIAL_SESSION') {
        this.authReady$.next(true);
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
        data: { display_name }
      }
    });
  }

  resetPassword(email: string) {
    return this.client.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://kakugo.app/auth/reset-password'
    });
  }

  updatePassword(newPassword: string) {
    return this.client.auth.updateUser({ password: newPassword });
  }
  getSession() {
    return this.client.auth.getSession();
  }
}
