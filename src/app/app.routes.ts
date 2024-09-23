import { Routes } from '@angular/router';
import {MaterialComponent} from './paginas/material/material.component'
import { AgregarNuevoContenidoComponent } from './paginas/agregar-nuevo-contenido/agregar-nuevo-contenido.component';
import { BuscarMateriaComponent } from './paginas/buscar-materia/buscar-materia.component';
import { MostrarMateriaComponent } from './paginas/mostrar-materia/mostrar-materia.component';
import { DetalleMateriaComponent } from './paginas/detalle-materia/detalle-materia.component';
import {VerMaterialesComponent} from './paginas/ver-materiales/ver-materiales.component'

export const routes: Routes = [
  { path: 'ver-material/:id', component: MaterialComponent },
  { path: 'agregar-nuevo-contenido', component: AgregarNuevoContenidoComponent, title: 'Agregar Nuevo Contenido' },
  { path: 'mostrar-materia', component: MostrarMateriaComponent },
  { path: 'detalle-materia/:titulo', component: DetalleMateriaComponent }, // Modificación aquí
  { path: 'Buscar-Materia', component: BuscarMateriaComponent },
  { path: 'agregar-material-docente', loadChildren: () => import('./paginas/agregar-material-docente/home/feature/home-routing') },
  { path: 'ver-materiales', component: VerMaterialesComponent }
];

