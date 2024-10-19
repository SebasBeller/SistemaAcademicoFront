import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { MateriasProfesorService } from '../../servicios/materias-profesor.service';
import {InscripcionService} from '../../servicios/inscripcion.service';
import {AuthService} from '../../servicios/auth.service';


@Component({
  selector: 'app-mostrar-materia',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './mostrar-materia.component.html',
  styleUrls: ['./mostrar-materia.component.sass'] 
})
export class MostrarMateriaComponent implements OnInit {
  servicioMateriasProfesor:MateriasProfesorService=inject(MateriasProfesorService);
  servicioInscripcion:InscripcionService=inject(InscripcionService);
  servicioAutenticacion:AuthService=inject(AuthService);

  materias:MateriaAsignadaDocente[]=[];
  materiaAsignada: any;
  searchTerm: string = '';


  ngOnInit(): void {
    this.servicioInscripcion.obtenerMaterias(this.servicioAutenticacion.getUserId()).subscribe(
      (response: MateriaAsignadaDocente[]) => {
        console.log('Datos recibidos:', response);
        this.materias = response; // Asigna los datos cuando la respuesta es recibida
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    );
  }

  get filteredMaterias(): MateriaAsignadaDocente[] {
    return this.materias.filter(materia =>
      materia.materia?.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



}
