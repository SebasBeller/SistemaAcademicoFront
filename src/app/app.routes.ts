import { Routes } from '@angular/router';
import { AgregarNuevoContenidoComponent } from './agregar-nuevo-contenido/agregar-nuevo-contenido.component';

export const routes: Routes = [
    {
    path: 'agregar-nuevo-contenido',
    component: AgregarNuevoContenidoComponent,  // Aquí registras tu componente en las rutas
    title: 'Agregar Nuevo Contenido'
    }
];
