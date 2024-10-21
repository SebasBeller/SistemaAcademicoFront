import { Component, inject, OnInit } from '@angular/core';
import { NotasEService } from '../../servicios/notas-e.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-notas-por-materia-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-notas-por-materia-profesor.component.html',
  styleUrl: './mostrar-notas-por-materia-profesor.component.sass'
})
export class MostrarNotasPorMateriaProfesorComponent implements OnInit {
  datos: any[] = [];
  id_dicta!:number;
  route:ActivatedRoute= inject(ActivatedRoute)
  constructor(private notasEService: NotasEService) {
    this.id_dicta=this.route.snapshot.params['id_dicta']
  } // Asegúrate de inyectar el servicio aquí

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

  /// tipo de Dato

  private calcularPromedio(promedio: number): number {
    return promedio || 0; // Asegúrate de manejar correctamente los casos sin promedio
  }
}
