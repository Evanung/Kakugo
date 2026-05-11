import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../supabase-service';

export const AuthGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  await supabase.waitForAuthReady(); // wait for INITIAL_SESSION to fire

  const { data: { session } } = await supabase.client.auth.getSession();

  if (!session) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
