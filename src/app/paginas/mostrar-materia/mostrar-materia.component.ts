import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { MateriasProfesorService } from '../../servicios/materias-profesor.service';

@Component({
  selector: 'app-mostrar-materia',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './mostrar-materia.component.html',
  styleUrls: ['./mostrar-materia.component.sass'] 
})
export class MostrarMateriaComponent implements OnInit {
  servicioMateriasProfesor:MateriasProfesorService=inject(MateriasProfesorService);
  materias:MateriaAsignadaDocente[]=[];
  materiaAsignada: any;


  ngOnInit(): void {
    this.servicioMateriasProfesor.obtenerMaterias().subscribe(
      (response: MateriaAsignadaDocente[]) => {
        console.log('Datos recibidos:', response);
        this.materias = response; 
        this.materias.forEach(materia => console.log(materia));
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    );
  }



}
