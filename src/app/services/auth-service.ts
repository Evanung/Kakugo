import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  currentUser$ = this.supabase.currentUser$;

  async getCurrentUserId(): Promise<string | null> {
    const { data } = await this.supabase.getSession();
    return data.session?.user.id ?? null;
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.signIn(email, password);
    if (error) throw new Error(error.message);
    return data;
  }

  async signUp(display_name: string, email: string, password: string) {
    const { data, error } = await this.supabase.signUp(display_name, email, password);
    if (error) throw new Error(error.message);
    return data;
  }

  async resetPassword(email: string) {
    const { error } = await this.supabase.resetPassword(email);
    if (error) throw new Error(error.message);
  }

  async updatePassword(newPassword: string) {
    const { error } = await this.supabase.updatePassword(newPassword);
    if (error) throw new Error(error.message);
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
