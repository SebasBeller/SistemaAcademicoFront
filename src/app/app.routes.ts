import { Routes } from '@angular/router';
import {MaterialComponent} from './paginas/material/material.component'
import { AgregarNuevoContenidoComponent } from './agregar-nuevo-contenido/agregar-nuevo-contenido.component';
import { BuscarMateriaComponent } from './paginas/buscar-materia/buscar-materia.component';

export const routes: Routes = [
    {path:'ver-material',component:MaterialComponent},{
        path: 'agregar-nuevo-contenido',
        component: AgregarNuevoContenidoComponent,  // Aquí registras tu componente en las rutas
        title: 'Agregar Nuevo Contenido'
        },
    {path : 'Buscar-Materia', component: BuscarMateriaComponent} ];
