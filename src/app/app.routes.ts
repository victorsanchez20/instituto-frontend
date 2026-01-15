import { Routes } from '@angular/router';
import { StudentLayout } from './layouts/student-layout/student-layout';
import { Inicio } from './student/pages/inicio/inicio';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './public/pages/home/home';

export const routes: Routes = [
    {
        path: 'portal',
        component: StudentLayout,
        children: [
            { path: '', component: Inicio }
        ]
    },
    {
        path: '',
        component: PublicLayout,
        children: [
            { path: '', component: Home}
        ]
    }

];
