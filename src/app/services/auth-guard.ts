import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const AuthGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const loggedIn = await auth.isLoggedIn();
  if (!loggedIn) {
    await router.navigate(['/login-page']);
    return false;
  }
  return true;
};
