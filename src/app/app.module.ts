import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Componentes/nav/nav.component';
import { PaginaPrincipalComponent } from './Componentes/pagina-principal/pagina-principal.component';
import { DetallesComponent } from './Componentes/detalles/detalles.component';
import { NotificacionesComponent } from './Componentes/notificaciones/notificaciones.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { QRCodeModule } from 'angular2-qrcode';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpHeaderService } from './Interceptors/http-header.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PaginaPrincipalComponent,
    DetallesComponent,
    NotificacionesComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeaderService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
