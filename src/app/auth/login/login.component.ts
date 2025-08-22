import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    //Modulos de PrimeNg
    NgIf,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  loading = false;
  error:string | null = null;
  private sub?: Subscription;
  private returnUrl: string = '/projects';

 constructor(
   private fb:FormBuilder,
   private authService:AuthService,
   private router:Router,
   private route: ActivatedRoute) {
  }

 ngOnInit(): void {

  if(this.authService.isAuthenticated){
    this.router.navigateByUrl(this.returnUrl);
    return;
  }

  this.loginForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('',[Validators.required])
  })

  const q = this.route.snapshot.queryParamMap.get('returnUrl');
  if(q) this.returnUrl = q; 
 }

 onSubmit(){
  console.log(this.loginForm.value);
  
  this.error = null;
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    return;
  }

  const {username, password} = this.loginForm.value;
  this.loading = true;

  if(this.sub){this.sub.unsubscribe();}

  this.sub = this.authService.login(username, password).subscribe({
    next: (success) => {
      this.loading = false;
      if(success){
        this.router.navigateByUrl(this.returnUrl);
      }else{
        this.error = 'Usuario o contraseña incorrectos';
      }
    },
    error: (e) => {
      console.log('Login error:',e);
      this.loading = false;
      this.error = 'Error al iniciar sesión. Inténtalo de nuevo';
    }
  });
 }

 validInput(field:string):boolean{
  const control = this.loginForm.get(field);
   return !!(control && control.touched && control.invalid);
 }

 ngOnDestroy(): void {
  if(this.sub){
    this.sub.unsubscribe();
  }
 }
}
