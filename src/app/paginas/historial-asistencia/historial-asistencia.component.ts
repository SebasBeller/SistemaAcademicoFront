import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-asistencia',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './historial-asistencia.component.html',
  styleUrl: './historial-asistencia.component.sass'
})
export class HistorialAsistenciaComponent {
  // Variables para la búsqueda
  busqueda: string = '';
  tipoFiltro: string = 'materia'; // Por defecto, se busca por materia

  // Historial de materias (puedes modificar los datos según tu caso)
  historialMaterias = [
    {
      materia: 'Matemáticas',
      profesor: 'Profesor Pérez',
      paralelo: 'A',
      imagen: 'https://via.placeholder.com/100',
      faltas: 3,
      asistencias: 20,
      licencias: 1,

    },
    {
      materia: 'Física',
      profesor: 'Profesora López',
      paralelo: 'B',
      imagen: 'https://via.placeholder.com/100',
      faltas: 2,
      asistencias: 18,
      licencias: 2,

    },
    {
      materia: 'Química',
      profesor: 'Profesor Gómez',
      paralelo: 'A',
      imagen: 'https://via.placeholder.com/100',
      faltas: 1,
      asistencias: 19,
      licencias: 0,

    },
    {
      materia: 'Geometria',
      profesor: 'Adelio Martínez',
      paralelo: 'B',
      imagen: 'https://via.placeholder.com/100',
      faltas: 1,
      asistencias: 19,
      licencias: 1,

    }
  ];

  // Arreglo que contiene los resultados filtrados
  materiasFiltradas = [...this.historialMaterias];

  // Método para filtrar las materias basado en la búsqueda y el filtro seleccionado
  filtrarMaterias() {
    const filtro = this.busqueda.toLowerCase();

    // Aplica el filtro según el tipo seleccionado
    this.materiasFiltradas = this.historialMaterias.filter((materia) => {
      if (this.tipoFiltro === 'materia') {
        return materia.materia.toLowerCase().includes(filtro);
      } else if (this.tipoFiltro === 'docente') {
        return materia.profesor.toLowerCase().includes(filtro);
      } else if (this.tipoFiltro === 'paralelo') {
        return materia.paralelo.toLowerCase().includes(filtro);
      }
      return false;
    });

  }
  calcularTotalClases(materia: any): number {
    return materia.faltas + materia.asistencias + materia.licencias;
  }
}
