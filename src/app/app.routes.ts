import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren:() =>
            import('./auth/auth-routes')
                .then(m=>m.AUTH_ROUTES)
    },
    {
        path:'projects',
        loadChildren:()=>
            import('./projects/projects-routes')
                .then(m=>m.PROJECTS_ROUTES)
    },
    {path:'', redirectTo:'projects', pathMatch:'full'},
    {path:'**', redirectTo:'projects'}
];
