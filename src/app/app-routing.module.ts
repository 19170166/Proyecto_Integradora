import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesComponent } from './Componentes/detalles/detalles.component';
import { LoginComponent } from './Componentes/login/login.component';
import { NotificacionesComponent } from './Componentes/notificaciones/notificaciones.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { PaginaPrincipalComponent } from './Componentes/pagina-principal/pagina-principal.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { GuardisLoginGuard } from './Guards/isLogin/guardis-login.guard';
import { GuardLoginGuard } from './Guards/Login/guard-login.guard';


const routes: Routes = [
  //{path: 'Inicio', component:PaginaPrincipalComponent,pathMatch: 'full'},
  {path: 'Detalle', component:DetallesComponent,pathMatch:'full',canActivate:[GuardLoginGuard]},
  {path: 'Notificaciones', component:NotificacionesComponent,pathMatch:'full',canActivate:[GuardLoginGuard]},
  {path: 'Login', component:LoginComponent,pathMatch:'full',canActivate:[GuardisLoginGuard]},
  {path: 'Registro', component:RegistroComponent,pathMatch:'full',canActivate:[GuardisLoginGuard]},

  {path:'', component:PaginaPrincipalComponent},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
