import { Component, OnInit } from '@angular/core';
import { NotasEService } from '../../servicios/notas-e.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { Nota } from '../../interfaces/notas';

@Component({
  selector: 'app-mostrar-notas-por-materia-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-notas-por-materia-profesor.component.html',
  styleUrls: ['./mostrar-notas-por-materia-profesor.component.sass']
})
export class MostrarNotasPorMateriaProfesorComponent implements OnInit {
  datos: Nota[] = [];
  id_dicta!: number;
  loading: boolean = false;
  materiaAsignada: MateriaAsignadaDocente[] = []; 

  constructor(private notasEService: NotasEService, private route: ActivatedRoute) {
    this.id_dicta = Number(this.route.snapshot.paramMap.get('id_dicta'));
  }

  ngOnInit(): void {
    if (!this.id_dicta) {
      console.error('ID dictada es undefined');
      return;
    }
    this.obtenerMateria();
  }

  private obtenerDatos(): void {
    if (!this.materiaAsignada) {
      console.error('Materia no asignada');
      return; // Salir si no hay materia asignada
    }

    this.loading = true;
    this.notasEService.getDatos(this.id_dicta).subscribe(
      (response: any[]) => {
        // Filtrar notas relacionadas a la materia asignada
        this.datos = response.map(item => ({
          apellido: item.apellido,
          nombre: item.nombre,
          trimestre1: parseFloat(item.promedio1 ? item.promedio1.toFixed(2) : '0.00'),
          trimestre2: parseFloat(item.promedio2 ? item.promedio2.toFixed(2) : '0.00'),
          trimestre3: parseFloat(item.promedio3 ? item.promedio3.toFixed(2) : '0.00'),
          promedio: this.calcularPromedio(item.promedioTotal).toFixed(2) // Muestra el promedio con 2 decimales
        }));
        this.loading = false;
      },
      error => {
        console.error('Error al obtener los datos:', error);
        this.loading = false;
      }
    );
  }

  private obtenerMateria(): void {
    this.notasEService.getMateriaPorIdDicta(this.id_dicta).subscribe(
      (response: MateriaAsignadaDocente[]) => { // Cambiar a un arreglo de MateriaAsignadaDocente
        this.materiaAsignada = response; // Almacena la lista de materias
        console.log('Materias asignadas:', this.materiaAsignada);
        this.obtenerDatos(); // Obtener datos de notas después de tener las materias asignadas
      },
      error => {
        console.error('Error al obtener las materias:', error);
      }
    );
  }


  private calcularPromedio(promedio: number): number {
    return promedio || 0;
  }
}
