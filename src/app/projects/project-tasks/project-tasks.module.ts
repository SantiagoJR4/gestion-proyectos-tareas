import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTasksRoutingModule } from './project-tasks-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTasksComponent } from './project-tasks.component';
import { TaskFormComponent } from '../task-form/task-form.component';


const routes:Routes = [
  {path:'', loadComponent:() => import('./project-tasks.component').then(m => m.ProjectTasksComponent)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectTasksRoutingModule,
    HttpClientModule,
    CardModule,
    ProgressSpinnerModule,
    RouterModule.forChild(routes),
    TaskFormComponent
  ]
})
export class ProjectTasksModule { }
