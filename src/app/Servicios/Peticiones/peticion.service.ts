import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  apiURL = environment.apiURL;

  constructor(private http:HttpClient) { }

  sendPet(valor:any):Observable<any>{
    const pet= {valor:valor}
    console.log(pet)
    return this.http.post(this.apiURL + 'LlenarP', pet)
  }
}
