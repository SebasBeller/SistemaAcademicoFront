import {ChangeDetectionStrategy, Component,inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import {Materia} from '../../interfaces/materia';
@Component({
  selector: 'app-ver-materias-docente',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './ver-materias-docente.component.html',
  styleUrl: './ver-materias-docente.component.sass',
})
export class VerMateriasDocenteComponent implements OnInit {
  servicioMateriasProfesor:MateriasProfesorService=inject(MateriasProfesorService);
  materias:Materia[]=[];
  
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
