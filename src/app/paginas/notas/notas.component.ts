import { Component, OnInit } from '@angular/core';
import { NotaService } from '../../servicios/nota.service';
import { Nota } from '../../interfaces/nota';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { Materias } from '../../interfaces/materias';
import { Estudiante } from '../../interfaces/estudiante';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.sass']
})
export class NotasComponent implements OnInit {
  notas: Nota[] = [];
  notasPorMateria: { [id_dicta: number]: { trimestre: number; notasPorTipo: { [tipo: string]: number[] } }[] } = {};
  profesores: MateriaAsignadaDocente[] = [];
  estudiantes: Estudiante[] = [];
  materiasAsignadas: Materias[] = [];
  selectedYear: number = 2024;
  filteredProfesores: MateriaAsignadaDocente[] = [];
  filteredEstudiantes: Estudiante[] = [];
  nombresMaterias: { [id_materia: number]: string } = {};

  constructor(private readonly notaService: NotaService) {}

  ngOnInit(): void {
    this.obtenerProfesores();
    this.obtenerEstudiantes();
    this.obtenerNotas();
  }

  obtenerProfesores(): void {
    this.notaService.obtenerProfesores().subscribe(
      (profesores: MateriaAsignadaDocente[]) => {
        this.profesores = profesores;
        this.filteredProfesores = profesores; // Si necesitas filtrarlos
        this.cargarNombresMaterias();
      },
      (error: any) => {
        console.error('Error en la petición de profesores:', error);
      }
    );
  }

  obtenerEstudiantes(): void {
    this.notaService.obtenerEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.estudiantes = estudiantes;
        this.filteredEstudiantes = estudiantes;
      },
      (error: any) => {
        console.error('Error en la petición de estudiantes:', error);
      }
    );
  }

  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = +selectElement.value;
    this.obtenerNotas();
  }

  obtenerNotas(): void {
    this.notaService.obtenerTodasLasNotas().subscribe(
      (notas: Nota[]) => {
        this.notas = notas;
        this.agruparNotasPorMateria();
      },
      (error: any) => {
        console.error('Error en la petición de notas:', error);
      }
    );
  }

  cargarNombresMaterias(): void {
    this.filteredProfesores.forEach((materia: MateriaAsignadaDocente) => {
      const id_materia = materia.id_dicta; // Asegúrate de que este es el ID correcto
      const nombre = materia.materia?.nombre; // Asegúrate de que 'nombre' existe
      if (id_materia && nombre) {
        this.nombresMaterias[id_materia] = nombre; // Asigna el nombre de la materia al ID
      }
    });
  }

  agruparNotasPorMateria(): void {
    this.notasPorMateria = {};

    this.notas.forEach(nota => {
      const id_dicta = nota.materiaAsignada.id_dicta;
      const trimestre = nota.trimestre;
      const tipo = nota.tipo; // "hacer", "decidir", "saber", "ser"
      const notaValue = nota.nota;

      if (!this.notasPorMateria[id_dicta]) {
        this.notasPorMateria[id_dicta] = [];
      }

      let trimestreExistente = this.notasPorMateria[id_dicta].find(t => t.trimestre === trimestre);

      if (!trimestreExistente) {
        trimestreExistente = { trimestre, notasPorTipo: { hacer: [], decidir: [], saber: [], ser: [] } };
        this.notasPorMateria[id_dicta].push(trimestreExistente);
      }

      // Agregamos la nota al tipo correspondiente
      if (tipo in trimestreExistente.notasPorTipo) {
        trimestreExistente.notasPorTipo[tipo].push(notaValue);
      }
    });
  }



  calcularPromedioPorTipo(id_dicta: number, trimestre: number, tipo: string): number {
    const trimestres = this.notasPorMateria[id_dicta];
    if (!trimestres) return 0;

    const trimestreExistente = trimestres.find(t => t.trimestre === trimestre);
    if (!trimestreExistente) return 0;

    const notasDelTipo = trimestreExistente.notasPorTipo[tipo];
    if (!notasDelTipo) return 0;

    const totalNotas = notasDelTipo.reduce((sum, nota) => sum + nota, 0);
    return totalNotas / notasDelTipo.length;
  }

  calcularPromedioGlobalPorTrimestre(id_dicta: number, trimestre: number): number {
    const tipos = ["hacer", "decidir", "saber", "ser"];
    let sumaPromedios = 0;
    let tiposConNotas = 0;

    tipos.forEach(tipo => {
      const promedioPorTipo = this.calcularPromedioPorTipo(id_dicta, trimestre, tipo);
      if (promedioPorTipo > 0) {
        sumaPromedios += promedioPorTipo;
        tiposConNotas++;
      }
    });

    return tiposConNotas > 0 ? sumaPromedios / tiposConNotas : 0;
  }

  calcularPromedioGeneral(id_dicta: number): number {
    const trimestres = [1, 2, 3]; // Suponiendo que los trimestres son 1, 2 y 3
    let sumaPromedios = 0;
    let trimestresConNotas = 0;

    trimestres.forEach(trimestre => {
        const promedioTrimestre = this.calcularPromedioGlobalPorTrimestre(id_dicta, trimestre);
        if (!isNaN(promedioTrimestre) && promedioTrimestre > 0) {
            sumaPromedios += promedioTrimestre;
            trimestresConNotas++;
        }
    });

    return trimestresConNotas > 0 ? sumaPromedios / trimestresConNotas : 0; // Retorna el promedio general
}

  determinarEstado(promedio: number): string {
    if (promedio >= 70) return 'Aprobado';
    if (promedio >= 50) return 'En recuperación';
    return 'Reprobado';
  }
}
