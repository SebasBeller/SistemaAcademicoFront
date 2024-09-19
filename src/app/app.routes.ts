import { Routes } from '@angular/router';
import {MaterialComponent} from './paginas/material/material.component'
import { AgregarNuevoContenidoComponent } from './paginas/agregar-nuevo-contenido/agregar-nuevo-contenido.component';
import { BuscarMateriaComponent } from './paginas/buscar-materia/buscar-materia.component';
import { MostrarMateriaComponent } from './paginas/mostrar-materia/mostrar-materia.component';
import { DetalleMateriaComponent } from './paginas/detalle-materia/detalle-materia.component';
export const routes: Routes = [
    {path:'ver-material',component:MaterialComponent

    },
    {
      path: 'agregar-nuevo-contenido',
      component: AgregarNuevoContenidoComponent,  // Aquí registras tu componente en las rutas
      title: 'Agregar Nuevo Contenido'
    },
      {path:'mostrar-materia', component:MostrarMateriaComponent

      },
      {path:'detalle-materia', component:DetalleMateriaComponent},
     {path : 'Buscar-Materia', component: BuscarMateriaComponent}
      ];

