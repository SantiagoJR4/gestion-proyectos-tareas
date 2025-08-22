import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectHomeComponent } from './project-home/project-home.component';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    children: [
      {path: '', component: ProjectHomeComponent},
      {path: 'listProjects', loadComponent: () => import('./project-list/project-list.component').then(m => m.ProjectListComponent)},
      {
        path: ':id/tasks',
        loadChildren:() => import('./project-tasks/project-tasks.module').then(m => m.ProjectTasksModule),
        canActivate: [authGuard]
      },
      {path:'**', redirectTo:''}
    ]
  }
];