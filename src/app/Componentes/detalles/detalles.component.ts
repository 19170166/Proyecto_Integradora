import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client'
import { AuthLoginService } from 'src/app/Servicios/AuthLogin/auth-login.service';
import { errorMessage, successDialog } from 'src/app/Functions/alerts';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  nivelSisterna:number = 75
  nivelPila:number = 10
  vr:number

  user = {nombre:'angel'}
  
  constructor(private auth:AuthLoginService) { }
  ngOnInit(): void {
    
  }
  
  llenar(){
    const nivel = document.getElementById('selectNivel').value;
    if(nivel<this.nivelSisterna){
      this.nivelPila = nivel
    }else{
      errorMessage('No hay suficiente agua en la sisterna')
    }
  }

}
