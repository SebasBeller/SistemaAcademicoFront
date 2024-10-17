import { Component, OnInit } from '@angular/core';
import { NotasEService } from '../../servicios/notas-e.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common'; // Importar CommonModule


@Component({
  selector: 'app-mostrar-notas-por-materia-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-notas-por-materia-profesor.component.html',
  styleUrl: './mostrar-notas-por-materia-profesor.component.sass'
})
export class MostrarNotasPorMateriaProfesorComponent implements OnInit {
  datos: any[] = [];

  constructor(private notasEService: NotasEService) {} // Asegúrate de inyectar el servicio aquí

  ngOnInit(): void {
    this.obtenerDatos();
  }

  private obtenerDatos(): void {
    this.notasEService.getDatos().subscribe(
      (response: any[]) => {
        this.datos = response.map(item => {
          return {
            apellido: item.apellido,
            nombre: item.nombre,
            trimestre1: item.promedio1,
            trimestre2: item.promedio2,
            trimestre3: item.promedio3,
            promedio: this.calcularPromedio(item.promedioTotal)
          };
        });
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  private convertirNotas(notas: number[]): string {
    return notas.length > 0 ? notas.join(', ') : 'Sin notas';
  }

  private calcularPromedio(promedio: number): number {
    return promedio || 0; // Asegúrate de manejar correctamente los casos sin promedio
  }
}
