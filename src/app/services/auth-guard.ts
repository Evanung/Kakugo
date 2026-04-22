import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase-service';

export const AuthGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const { data: { session } } = await supabase.client.auth.getSession();

  console.log('SESSION:', session);
  console.log('ACCESS TOKEN:', session?.access_token);
  console.log('EXPIRES AT:', session?.expires_at);

  if (!session) {
    console.log('NO SESSION - redirecting to login');
    router.navigate(['/login-page']);
    return false;
  }

  console.log('SESSION FOUND - allowing access');
  return true;
};
