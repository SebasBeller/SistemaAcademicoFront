import { Component, OnInit } from '@angular/core';
import { HistorialAsistenciaService } from '../../servicios/historial-asistencia.service';
import { Asistencia } from '../../interfaces/asistencia';
import { Profesor } from '../../interfaces/profesor';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historial-asistencia',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './historial-asistencia.component.html',
  styleUrls: ['./historial-asistencia.component.sass']
})
export class HistorialAsistenciaComponent implements OnInit {
  asistencias: Asistencia[] = [];
  profesores: Profesor[] = [];
  materiasAsignadas: MateriaAsignadaDocente[] = [];
  busqueda: string = '';
  materiasFiltradas: MateriaAsignadaDocente[] = [];
  selectedProfesorId: number | null = null;
  selectedParalelo: string | null = null;
tipoFiltro: any;

  constructor(private readonly historialAsistenciaService: HistorialAsistenciaService) {}

  ngOnInit(): void {
    this.obtenerAsistencias();
    this.obtenerProfesores();
    this.obtenerMateriasAsignadas();
    // Si necesitas obtener materias, implementa el método obtenerMaterias
    // this.obtenerMaterias();
  }

  obtenerAsistencias(): void {
    this.historialAsistenciaService.obtenerAsistencias().subscribe(
      (asistencias) => {
        console.log('Asistencias recibidas:', asistencias);
        this.asistencias = asistencias;
      },
      error => {
        console.error('Error en la petición de asistencias:', error);
      }
    );
  }

  obtenerProfesores(): void {
    this.historialAsistenciaService.obtenerProfesores().subscribe(
      (profesores) => {
        console.log('Profesores recibidos:', profesores);
        this.profesores = profesores;
      },
      error => {
        console.error('Error en la petición de profesores:', error);
      }
    );
  }

  obtenerMateriasAsignadas(): void {
    this.historialAsistenciaService.obtenerMateriasAsignadas().subscribe(
      (materiasAsignadas) => {
        console.log('Materias asignadas recibidas:', materiasAsignadas);
        this.materiasAsignadas = materiasAsignadas;
        this.materiasFiltradas = materiasAsignadas;
      },
      error => {
        console.error('Error en la petición de materias asignadas:', error);
      }
    );
  }

  filtrarMaterias(): void {
    this.materiasFiltradas = this.materiasAsignadas; // Resetea a todas las materias

    // Filtrar por búsqueda de título
    if (this.busqueda.trim() !== '') {
      this.materiasFiltradas = this.materiasFiltradas.filter(materia =>
        materia.materia?.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) // Filtra según el nombre
      );
    }

    // Filtrar por profesor
    if (this.selectedProfesorId !== null) {
      this.materiasFiltradas = this.materiasFiltradas.filter(materia =>
        materia.profesor && materia.profesor.id_profesor === this.selectedProfesorId
      );
    }

    // Filtrar por paralelo
    if (this.selectedParalelo) {
      this.materiasFiltradas = this.materiasFiltradas.filter(materia =>
        materia.materia && materia.materia.paralelo && materia.materia.paralelo.paralelo === this.selectedParalelo // Filtra según el paralelo
      );
    }
  }

  seleccionarProfesor(profesorId: number | null): void {
    this.selectedProfesorId = profesorId;
    this.filtrarMaterias();
  }

  seleccionarParalelo(paralelo: string | null): void {
    this.selectedParalelo = paralelo;
    this.filtrarMaterias();
  }

  calcularTotalClases(materia: MateriaAsignadaDocente): { faltas: number, asistencias: number, licencias: number } {
    let faltas = 0;
    let asistencias = 0;
    let licencias = 0;
    // console.log(this.asistencias)
    this.asistencias.forEach(asistencia => {
      if (asistencia.materiaAsignada.id_dicta === materia.id_dicta && asistencia.estudiante?.id_estudiante==5) {
        switch (asistencia.estado) {
          case 'Falta':
            faltas++;
            break;
          case 'Presente':
            asistencias++;
            break;
          case 'Justificado':
            licencias++;
            break;
        }
      }
    });

    return { faltas, asistencias, licencias };
  }
}
