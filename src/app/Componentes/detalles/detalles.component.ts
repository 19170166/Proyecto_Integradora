import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  n:number = 9
  
  constructor() { }
  ngOnInit(): void {
    
  }

}
