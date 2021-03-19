import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginService } from 'src/app/Servicios/AuthLogin/auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardisLoginGuard implements CanActivate {
  constructor(private auth:AuthLoginService, private router:Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.verifyLogin()){
      return this.router.navigate(['Detalle']).then(()=>false)
    }
    return true;
  }
  
}
