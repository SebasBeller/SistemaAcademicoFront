import { Component, OnInit } from '@angular/core';
import { HistorialAsistenciaService } from '../../servicios/historial-asistencia.service';
import { Asistencia } from '../../interfaces/asistencia';
import { Profesor } from '../../interfaces/profesor';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Day {
  day: number;
  status: 'Presente' | 'Justificado' | 'Falta';
}

@Component({
  selector: 'app-ver-asistencia-por-materia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-asistencia-por-materia.component.html',
  styleUrls: ['./ver-asistencia-por-materia.component.sass']
})
export class VerAsistenciaPorMateriaComponent {
  asistencias: Asistencia[] = [];
  profesores: Profesor[] = [];
  materiasAsignadas: MateriaAsignadaDocente[] = [];
  busqueda: string = '';
  materiasFiltradas: MateriaAsignadaDocente[] = [];
  selectedProfesorId: number | null = null;
  selectedParalelo: string | null = null;
  tipoFiltro: any;
  idMateria:string | undefined;
  router: any;

  constructor(private readonly historialAsistenciaService: HistorialAsistenciaService) {}

  calcularTotalClases(materia: MateriaAsignadaDocente): { faltas: number, asistencias: number, licencias: number } {
    let faltas = 0;
    let asistencias = 0;
    let licencias = 0;

    this.asistencias.forEach(asistencia => {
      if (asistencia.materiaAsignada.id_dicta === materia.id_dicta) {
        switch (asistencia.estado) {
          case 'Falta':
            https://cdn-icons-png.freepik.com/256/9313/9313256.png
            faltas++;

            break;
          case 'Presente':
            https://cdn-icons-png.flaticon.com/512/13725/13725918.png
            asistencias++;
            break;
          case 'Justificado':
            https://cdn-icons-png.flaticon.com/512/3999/3999575.png
            licencias++;
            break;
        }
      }
    });

    return { faltas, asistencias, licencias };
  }
}
