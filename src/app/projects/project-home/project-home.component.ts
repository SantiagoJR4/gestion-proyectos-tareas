import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ButtonModule, CardModule
  ],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.css'
})
export class ProjectHomeComponent {

}
