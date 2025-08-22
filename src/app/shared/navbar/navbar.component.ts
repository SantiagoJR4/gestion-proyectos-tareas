import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService, User } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterModule,
    CommonModule
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user$ : Observable<User|null>;

  constructor(private authService:AuthService){
    this.user$ = this.authService.user$;
  }

  logout(): void{
    this.authService.logout();
  }

}
