import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGardGuard: CanActivateFn = (route, state) => {
  const authUser = inject(AuthService);
  const router = inject(Router);

  console.log("greddd");
  if (authUser.islogin()){
    console.log("greddd");
    return true;
  }
  else{
    console.log("greddd");
    router.navigate(['/login']);
    return false;
  }
};
