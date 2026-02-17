import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Inicio } from './student/pages/inicio/inicio';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './public/pages/home/home';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './auth/pages/login/login';
import { aulaComponent } from './admin/pages/aula/aulaComponent';
import { ProfesorComponent } from './admin/pages/profesor/profesorComponent';
import { CursoComponet } from './admin/pages/curso/CursoComponent';
import { Signup } from './auth/pages/signup/signup';
import { ListaAlumnos } from './admin/pages/lista-alumnos/lista-alumnos';
import { Nosotros } from './public/pages/nosotros/nosotros';
import { CursosPublic } from './public/pages/cursos-public/cursos-public';
import { Contacto } from './public/pages/contacto/contacto';
import { StudentLayout } from './layouts/student-layout/student-layout';
import { OfertaAcademica } from './student/pages/oferta-academica/oferta-academica';
import { InfoCurso } from './student/pages/oferta-academica/info-curso/info-curso';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayout,
        children: [
            { path: '', component: Home }, 
            { path: 'home', component: Home },
            { path: 'nosotros', component: Nosotros },
            { path: 'cursos', component: CursosPublic }, 
            { path: 'contacto', component: Contacto }
        ]
    },

    // 2. RUTAS DE AUTENTICACIÓN 
    {
        path: '', 
        component: AuthLayout,
        children: [
            { path: 'login', component: Login },
            { path: 'signup', component: Signup }
        ]
    },

    // 3. RUTAS DE ESTUDIANTE / PORTAL
    {
        path: 'portal',
        component: AdminLayout,
        children: [
            { path: '', component: Inicio },
            { path: 'aula', component: aulaComponent},
            { path: 'profesores', component: ProfesorComponent},
            { path: 'cursos', component: CursoComponet},
            { path: 'alumnos', component: ListaAlumnos}
        ]
    },
    
    {
        path: 'portal-estudiante',
        component: StudentLayout,
        children: [
            { path: '', component: Inicio},
            { path: 'oferta-academica', component: OfertaAcademica },
            { path: 'curso/:id', component: InfoCurso }

        ]
    },

    { path: '**', redirectTo: '' }
];
