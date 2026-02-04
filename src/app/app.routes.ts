import { Routes } from '@angular/router';
import { StudentLayout } from './layouts/student-layout/student-layout';
import { Inicio } from './student/pages/inicio/inicio';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './public/pages/home/home';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './auth/pages/login/login';
import { Aula } from './admin/pages/aula/aula';
import { Profesor } from './admin/pages/profesor/profesor';
import { Curso } from './admin/pages/curso/curso';

export const routes: Routes = [
    {
        path: 'portal',
        component: StudentLayout,
        children: [
            { path: '', component: Inicio },
            { path: 'aula', component: Aula},
            { path: 'profesores', component: Profesor},
            { path: 'cursos', component: Curso}
        ]
    },
    {
        path: '',
        component: PublicLayout,
        children: [
            { path: '', component: Home}
        ]
    },
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: 'login', component: Login },
        ]
    }



];
