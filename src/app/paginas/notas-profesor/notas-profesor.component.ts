import {ChangeDetectionStrategy, Component,inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import {Materia} from '../../interfaces/materia';
import {MateriaAsignadaDocente} from '../../interfaces/materia-asignada-docente';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-notas-profesor',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,RouterModule],
  templateUrl: './notas-profesor.component.html',
  styleUrl: './notas-profesor.component.sass'
})
export class NotasProfesorComponent implements OnInit {
  servicioMateriasProfesor:MateriasProfesorService=inject(MateriasProfesorService);
  materias:MateriaAsignadaDocente[]=[];
  
  ngOnInit(): void {
     this.servicioMateriasProfesor.obtenerMaterias().subscribe(
       response => {
         console.log('Datos recibidos:', response);
         this.materias = response; // Asigna los datos cuando la respuesta es recibida
         console.log('Materias asignadas:', this.materias);
       },
       error => {
         console.error('Error en la petición GET:', error);
       }
     );
     
  }
  
}
