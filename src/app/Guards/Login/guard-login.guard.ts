import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../../Servicios/AuthLogin/auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginGuard implements CanActivate {

  constructor(private auth:AuthLoginService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.verifyLogin()){
      return this.router.navigate(['Login']).then(()=>false);
    }
    return true
  }
  
}
