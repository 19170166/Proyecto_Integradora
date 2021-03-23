import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  apiURL = environment.apiURL;
  user:any;

  constructor(private http:HttpClient, private cookie:CookieService) { }

  login(user:any): Observable<any>{
    const flagsecure = true
    this.cookie.set('user',JSON.stringify(user),1,'/','localhost',flagsecure,'None')
    return this.http.post(this.apiURL + 'Login',user);
  }

  registro(user:any):Observable<any>{
    return this.http.post(this.apiURL + 'Registro',user)
  }

  logout(){
    this.cookie.delete('token')
  }
  verifyLogin(){
    let v = false;
    if(this.cookie.check('token')){
      v = true
      return v
    }
    else{return v}
  }

  setToken(token: string){
    this.cookie.set('token', token,1,'/','localhost',true,'None');
  }

  getToken(){
    return this.cookie.get('token');
  }

  getUser(){
    //return this.http.post('',token);
    return this.user
  }
  
}
