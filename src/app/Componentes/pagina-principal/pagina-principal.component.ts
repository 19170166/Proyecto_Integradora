import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/Servicios/AuthLogin/auth-login.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  constructor(private auth:AuthLoginService, private router:Router) { }
  logeado = true;
  ngOnInit(): void {
    this.logeado = this.auth.verifyLogin()
  }

  logout(){
    this.auth.logout();
    window.location.reload()
  }

}
