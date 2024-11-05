import {ChangeDetectionStrategy, Component,inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import {Materia} from '../../interfaces/materia';
import {MateriaAsignadaDocente} from '../../interfaces/materia-asignada-docente';
import {RouterModule} from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-ver-materias-docente',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,RouterModule],
  templateUrl: './ver-materias-docente.component.html',
  styleUrl: './ver-materias-docente.component.sass',
})
export class VerMateriasDocenteComponent implements OnInit {
  servicioMateriasProfesor:MateriasProfesorService=inject(MateriasProfesorService);
  authService: AuthService = inject(AuthService);
  materias:MateriaAsignadaDocente[]=[];
  
ngOnInit(): void {
  const idProfesor = this.authService.getUserId();

     this.servicioMateriasProfesor.obtenerMaterias().subscribe(
       response => {
         console.log('Datos recibidos:', response);
        
         this.materias = response.filter(materia => materia.profesor?.id_profesor === idProfesor);
         console.log('id_dicta profesor:', idProfesor)
         console.log('Materias asignadas:', this.materias,);
       },
       error => {
         console.error('Error en la petición GET:', error);
       }
     );
     
  }
  
}
