import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  constructor(private http:HttpClient, private cookie:CookieService) { }

  login(user:any): Observable<any>{
    return this.http.post("https://reqres.in/api/login",user);
  }

  registro(user:any):Observable<any>{
    return this.http.post("https://reqres.in/api/register",user)
  }

  logout(){
    this.cookie.delete('token')
  }

  verifyLogin(){
    let v = true;
    if(this.cookie.check('token')){
      v = true
      return v
    }
    else{return v}
  }

  setToken(token: string){
    this.cookie.set('token', token);
  }

  getToken(){
    return this.cookie.get('token');
  }

  getUser(token:string){
    return this.http.post('',token);
  }
  
}
