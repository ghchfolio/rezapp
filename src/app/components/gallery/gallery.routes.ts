import { Routes } from '@angular/router';

export const GALLERY_ROUTES: Routes = [
    {
        path: 'gallery',
        loadComponent: () => import('./gallery.component').then(c => c.GalleryComponent),
        title: 'Gallery | CHFolio'
    },
    {
        path: 'details/:id',
        loadComponent: () => import('../../shared/gallery-details/gallery-details.component').then(c => c.GalleryDetailsComponent),
        title: 'Gallery Details | CHFolio'
    },
    {
        path: '',
        loadComponent: () => import('./gallery.component').then(c => c.GalleryComponent),
        title: 'Gallery | CHFolio'
    }
];