import { Routes } from '@angular/router';
import {MaterialComponent} from './paginas/material/material.component'
import { AgregarNuevoContenidoComponent } from './paginas/agregar-nuevo-contenido/agregar-nuevo-contenido.component';
import { BuscarMateriaComponent } from './paginas/buscar-materia/buscar-materia.component';
import { MostrarMateriaComponent } from './paginas/mostrar-materia/mostrar-materia.component';
import { DetalleMateriaComponent } from './paginas/detalle-materia/detalle-materia.component';
import {VerMateriasDocenteComponent} from './paginas/ver-materias-docente/ver-materias-docente.component'
import {VerMaterialesEstudianteComponent} from './paginas/ver-materia-estudiante/home/feature/home.component'
export const routes: Routes = [
  { path: 'ver-material/:id', component: MaterialComponent },
  { path: 'agregar-nuevo-contenido/:id_dicta', component: AgregarNuevoContenidoComponent, title: 'Agregar Nuevo Contenido' },
  { path: 'mostrar-materia', component: MostrarMateriaComponent },
  { path: 'detalle-materia/:id_dicta', component: DetalleMateriaComponent }, // Modificación aquí
  { path: 'Buscar-Materia', component: BuscarMateriaComponent },
  { path: 'agregar-material-docente/:id', loadChildren: () => import('./paginas/agregar-material-docente/home/feature/home-routing') },
  {path : 'ver-materias-docente', component: VerMateriasDocenteComponent },
  {path : 'ver-materiales-estudiante/:id', component:VerMaterialesEstudianteComponent}
];