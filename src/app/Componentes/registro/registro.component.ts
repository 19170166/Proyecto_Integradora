import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Modelos/User';
import {errorMessage,timeMessage,successDialog} from '../../Functions/alerts'
import { AuthLoginService } from 'src/app/Servicios/AuthLogin/auth-login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm:FormGroup;
  user: User;

  constructor(private fb:FormBuilder, private router:Router, private authservice:AuthLoginService) { 
    this.createFrom()
    console.log(this.registerForm.value)
  }

  ngOnInit(): void {
  }

  showdat(){
    console.log(this.registerForm.value)
  }

  register(): void {
    if (this.registerForm.invalid){
      return Object.values(this.registerForm.controls).forEach(control =>{
        console.log('algo esta mal')
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.authservice.registro(this.user).subscribe((data:any) => {
        
        if(data.status){
          timeMessage('Registrando', 1500).then(() => {
            successDialog('Registro Completado');
            this.router.navigate(['/Login']);
        });
        }else{
          errorMessage('Ese correo ya esta registrado')
        }
    }, error => {
          errorMessage('Ha ocurrido un error')
      });
    }
  }

  createFrom(): void{
    this.registerForm = this.fb.group({
      Nombre: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      passwordConfirm: ['',[Validators.required]]
    });
  }

  setUser():void{
    this.user= {
      Nombre: this.registerForm.get('Nombre').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    }
  }

  get NombreValidate(){
    return (
      this.registerForm.get('Nombre').invalid && this.registerForm.get('Nombre').touched
    );
  }
  get emailValidate(){
    return (
      this.registerForm.get('email').invalid && this.registerForm.get('email').touched
    );
  }
  get passwordValidate(){
    return (
      this.registerForm.get('password').invalid && this.registerForm.get('password').touched
    );
  }
  get password2Validate(){
    const pass = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('passwordConfirm').value;
    return pass === pass2 ? false : true;
  }

}
