import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { ActivatedRoute } from '@angular/router';
import { HistorialAsistenciaService } from '../../servicios/historial-asistencia.service';
import { Asistencia } from '../../interfaces/asistencia';

@Component({
  selector: 'app-ver-asistencia-por-materia',
  standalone: true,
  imports: [CommonModule],  // Asegurarse de que esté importado
  templateUrl: './ver-asistencia-por-materia.component.html',
  styleUrls: ['./ver-asistencia-por-materia.component.sass']
})
export class VerAsistenciaPorMateriaComponent implements OnInit {
  materia: string | null = '';
  professor: string | null = 'Juan Pablo';
  parallel: string = '1';
  
  asistenciasPorMes: { [key: string]: Asistencia[] } = {};  // Agrupación de asistencias por mes

  constructor(
    private route: ActivatedRoute,
    private historialAsistenciaService: HistorialAsistenciaService
  ) {}

  ngOnInit(): void {
    this.professor = this.route.snapshot.paramMap.get('professor');
    this.materia = this.route.snapshot.paramMap.get('materia');

    this.obtenerAsistencias();
  }

  obtenerAsistencias(): void {
    // Asumiendo que estás obteniendo todas las asistencias
    this.historialAsistenciaService.obtenerAsistencias().subscribe(
      (asistencias: Asistencia[]) => {
        this.agruparAsistenciasPorMes(asistencias);
      },
      (error) => {
        console.error('Error al obtener asistencias:', error);
      }
    );
  }

  agruparAsistenciasPorMes(asistencias: Asistencia[]): void {
    asistencias.forEach(asistencia => {
      const fecha = new Date(asistencia.fecha_asistencia);  // Convertir la fecha de string a objeto Date
      const mes = fecha.toLocaleString('es-ES', { month: 'long', year: 'numeric' });  // Formatear mes y año
      
      if (!this.asistenciasPorMes[mes]) {
        this.asistenciasPorMes[mes] = [];
      }
      this.asistenciasPorMes[mes].push(asistencia);  // Agregar la asistencia al mes correspondiente
    });
  }

  getImageForStatus(status: string): string {
    switch (status) {
      case 'Presente':
        return 'https://cdn-icons-png.flaticon.com/512/13725/13725918.png';
      case 'Justificado':
        return 'https://cdn-icons-png.flaticon.com/512/3999/3999575.png';
      case 'Falta':
        return 'https://cdn-icons-png.freepik.com/256/9313/9313256.png';
      default:
        return '';
    }
  }
}
