import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabase: SupabaseService, private router: Router) {}

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.signIn(email, password);
    if (error) throw new Error(error.message);
    return data;
  }

  async logout() {
    await this.supabase.signOut();
    this.router.navigate(['/login-page']);
  }

  async isLoggedIn(): Promise<boolean> {
    const { data } = await this.supabase.getSession();
    return !!data.session;
  }

}
