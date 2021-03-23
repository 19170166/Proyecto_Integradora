import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client'
import { AuthLoginService } from 'src/app/Servicios/AuthLogin/auth-login.service';
import { errorMessage, successDialog } from 'src/app/Functions/alerts';
import { NumberValueAccessor } from '@angular/forms';
import {NgModule} from '@angular/core'
import { environment } from 'src/environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  nivelSisterna = 55
  nivelPila = 10
  vr:number

  valorprueba:Number
  valorprueba2: Number

  ws:any
  valor:any
  valorS:any

  token:any = this.auth.getToken()

  isOnline:Boolean = false

  user:any
  
  constructor(private auth:AuthLoginService,private cookie:CookieService) { }
  
  ngOnInit(): void {
    this.ws = Ws('ws://'+environment.apiWebSocket,{
      path:'adonis-ws'
    });

    this.ws.withJwtToken(this.token).connect()

    this.valor = this.ws.subscribe('NivelP')
    this.valorS = this.ws.subscribe('NivelS')

    // this.valor.on('open', () => {
    //   console.log('canal abierto')
    //   this.isOnline = true
    // })
    // this.valorS.on('open', () =>{
    //   console.log('canal 2 abierto')
    // })

    this.user = this.cookie.get('user')

    this.valor.on('dato', (data:any) =>{
      console.log(data)
      this.nivelPila = data
    })
    this.valorS.on('dato', (data:any) =>{
      console.log(data)
      this.nivelSisterna = data
    })

  }

  enviardato(){
    this.valor.emit('dato', this.valorprueba)
  }

  enviardato2(){
    this.valorS.emit('dato', this.valorprueba2)
  }
  
  llenar(){
    const nivel =document.getElementById('selectNivel').value - this.nivelPila;
    if(nivel < this.nivelSisterna){
      if(Number(document.getElementById("selectNivel").value) > this.nivelPila){
        if(this.nivelPila <= 100){
          this.nivelPila = Number(this.nivelPila) + nivel
          this.nivelSisterna -= nivel

        }else{
          errorMessage('La pila esta llena')
        }
      }else{
        errorMessage('No se puede seleccionar ese valor')
      }
    }else{
      errorMessage('No hay suficiente agua en la sisterna')
    }
  }

}
