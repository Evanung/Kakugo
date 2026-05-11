import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../supabase-service';
import {Observable} from 'rxjs';

export const RecoveryGuard: CanActivateFn = () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  return new Observable(observer => {
    supabase.client.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        observer.next(true);
      } else {
        observer.next(router.createUrlTree(['/auth/forgot-password']));
      }
      observer.complete();
    });
  });
};
