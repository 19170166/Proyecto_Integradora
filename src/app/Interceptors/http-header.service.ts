import { HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../Servicios/AuthLogin/auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService implements HttpInterceptor {

  constructor(private cookie:CookieService, private auth:AuthLoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('entre al request');
    
    if(this.auth.verifyLogin()){
      const headers = new HttpHeaders({
        authorization: 'Bearer ' + this.auth.getToken()
      });

      const reqclone = req.clone({
        headers
      })
      
      return next.handle(reqclone)
    }else{
      alert('algo salio mal')
    }
  }
  
}
