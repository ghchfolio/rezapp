import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home | CHFolio',
    },
    {
        path: 'gallery',
        loadChildren: () => import('./components/gallery/gallery.routes').then(r => r.GALLERY_ROUTES),
    },
    {
        path: 'about',
        loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent),
        title: 'About | CHFolio',
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: HomeComponent
    }
];
