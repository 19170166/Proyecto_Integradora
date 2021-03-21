import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Modelos/User';
import { AuthLoginService } from 'src/app/Servicios/AuthLogin/auth-login.service';
import {errorMessage, timeMessage,successDialog} from '../../Functions/alerts' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  user:User;

  constructor(private router:Router, private authservice:AuthLoginService, private fb:FormBuilder) { 
    this.createForm()
  }

  ngOnInit(): void {
  }

  login(): void{
    if (this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control =>{
        control.markAsTouched()
      });
    }else{
      this.setUser();
      this.authservice.login(this.user).subscribe((data:any) => {
        timeMessage('Iniciando', 1500).then(() => {
          successDialog('Iniciado').then(()=> {
            console.log(data)
            this.authservice.setToken(data.token)
            //this.router.navigate(['/Detalle']);
            window.location.reload();
          });
      });
    }, error => {
          errorMessage('Usuario o contraseña incorrectos')
      });
    }
  }

  createForm(): void{
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    })
  }

  setUser():void{
    this.user= {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
  }

  get emailValidate(){
    return (
      this.loginForm.get('email').invalid && this.loginForm.get('email').touched
    ); 
  }

  get passwordValidate(){
    return (
      this.loginForm.get('password').invalid && this.loginForm.get('password').touched
    );
  }

}
