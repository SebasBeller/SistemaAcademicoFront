import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesMateria } from '../../interfaces/Lista-estudiantes-materia';
import { EstudiantesService } from '../../servicios/estudiantes-materia.service';

@Component({
  selector: 'app-lista-estudiantes-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-estudiantes-profesor.component.html',
  styleUrl: './lista-estudiantes-profesor.component.sass'
})
export class ListaEstudiantesProfesorComponent implements OnInit {
  estudiantes: EstudiantesMateria[] = [];

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit() {
    this.estudiantesService.obtenerEstudiantes().subscribe(data => {
        this.estudiantes = data.filter((estudiante: any) => estudiante.nombre);
        console.log(this.estudiantes);
    });
  }

}
