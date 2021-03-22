import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client'
import { AuthLoginService } from 'src/app/Servicios/AuthLogin/auth-login.service';
import { errorMessage, successDialog } from 'src/app/Functions/alerts';
import { NumberValueAccessor } from '@angular/forms';
import {NgModule} from '@angular/core'


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  nivelSisterna:number = 75
  nivelPila:number = 10
  vr:number

  valorprueba:Number
  valorprueba2: Number

  ws:any
  valor:any
  valorS:any

  isOnline:Boolean = false

  user = {nombre:'angel'}
  
  
  constructor(private auth:AuthLoginService) { }
  ngOnInit(): void {
    this.ws = Ws('ws://localhost:3333',{
      path:'adonis-ws'
    });

    this.ws.connect()

    this.valor = this.ws.subscribe('NivelP')
    this.valorS = this.ws.subscribe('NivelS')

    this.valor.on('open', () => {
      console.log('canal abierto')
      this.isOnline = true
    })
    this.valorS.on('open', () =>{
      console.log('canal 2 abierto')
    })

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
    const nivel = document.getElementById('selectNivel').value;
    if(nivel<this.nivelSisterna){
      this.nivelPila = nivel
    }else{
      errorMessage('No hay suficiente agua en la sisterna')
    }
  }

}
