import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ActivatedRoute } from '@angular/router';
import { HistorialAsistenciaService } from '../../servicios/historial-asistencia.service';
import { Asistencia } from '../../interfaces/asistencia';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-ver-asistencia-por-materia',
  standalone: true,
  imports: [CommonModule], // Asegurarse de que esté importado
  templateUrl: './ver-asistencia-por-materia.component.html',
  styleUrls: ['./ver-asistencia-por-materia.component.scss'],
})
export class VerAsistenciaPorMateriaComponent implements OnInit {
  materia!: number;
  materiaNombre!: string;
  professor: string | null = 'Juan Pablo';
  parallelo: string = '1';

  asistenciasPorMes: { [key: string]: Asistencia[] } = {}; // Agrupación de asistencias por mes

  constructor(
    private route: ActivatedRoute,
    private historialAsistenciaService: HistorialAsistenciaService,private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.professor = this.route.snapshot.paramMap.get('professor');
    this.materia = this.route.snapshot.params['materia'];
    this.materiaNombre = this.route.snapshot.params['materiaNombre'];


    this.obtenerAsistencias();
  }

  obtenerAsistencias(): void {
    // Asumiendo que estás obteniendo todas las asistencias
    this.historialAsistenciaService.obtenerAsistencias().subscribe(
      (asistencias: Asistencia[]) => {
        console.log(asistencias)
        this.agruparAsistenciasPorMes(asistencias);
      },
      (error) => {
        console.error('Error al obtener asistencias:', error);
      }
    );
  }

  agruparAsistenciasPorMes(asistencias: Asistencia[]): void {
    console.log(asistencias)
    asistencias.forEach((asistencia) => {
      if (
        asistencia.estudiante?.id_estudiante == this.authService.getUserId() &&
        asistencia.id_dicta == this.materia
      ) {
        console.log("gg",asistencia.fecha_asistencia)

        const fecha = new Date(asistencia.fecha_asistencia+"T00:00:00");
        console.log(fecha)
        const mes = fecha.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        });

        if (!this.asistenciasPorMes[mes]) {
          this.asistenciasPorMes[mes] = [];
        }
        this.asistenciasPorMes[mes].push(asistencia);
        console.log(asistencias);
        console.log(this.asistenciasPorMes);
      }
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
