import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent},
      {path: '**', redirectTo: 'login'},
    ]
  }
];