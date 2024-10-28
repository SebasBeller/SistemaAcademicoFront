import { Component, OnInit, inject, numberAttribute } from '@angular/core';
import { DetalleNotasService } from '../../servicios/detalle-notas.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormActuaNotasComponent } from '../form-actua-notas/form-actua-notas.component';
import { Estudiante } from '../../interfaces/estudiante';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { Nota} from '../../interfaces/nota';
import { Materia } from '../../interfaces/materia';

@Component({
  selector: 'app-detalle-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-notas.component.html',
  styleUrls: ['./detalle-notas.component.sass'],
})
export class DetalleNotasComponent implements OnInit {
  notasPorTrimestre: { [key: number]: any } = {};  
  notas: Nota[]=[];
  estudiantes: Estudiante[] = [];
  materiasAsignadas: Materia[] = [];
  profesores: MateriaAsignadaDocente[] = [];
  selectedYear: number = new Date().getFullYear(); 
  filteredProfesores: MateriaAsignadaDocente[] = [];
  filteredEstudiantes: Estudiante[] = [];
  nombresMaterias: { [id_materia: number]: string } = {};
  notasPorMateria: { [id_dicta: number]: { trimestre: number, notasPorTipo: { [tipo: string]: number[] } }[] } = {};

  constructor(
    private detalleNotasService: DetalleNotasService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog  // Inyectar el servicio de MatDialog
  ) {}
  ngOnInit(): void {
    this.obtenerEstudiantes();
    this.obtenerNotas();
}
filtrarNotasEstudianteMateria(idEstudiante: number, idMateria: number): void {
  // Filtrar las notas por el estudiante y la materia específicos
  const notasEstudianteMateria = this.notas.filter(nota => 
    nota.estudiante.id_estudiante === idEstudiante && 
    nota.materiaAsignada.id_dicta === idMateria
  );

  // Agrupar las notas por trimestre
  const notasAgrupadasPorTrimestre: { [trimestre: number]: { [tipo: string]: number[] } } = {};

  notasEstudianteMateria.forEach(nota => {
    const trimestre = nota.trimestre;
    const tipo = nota.tipo;
    const valorNota = nota.nota;

    // Inicializar el trimestre si no existe
    if (!notasAgrupadasPorTrimestre[trimestre]) {
      notasAgrupadasPorTrimestre[trimestre] = { ser: [], hacer: [], saber: [], decidir: [] };
    }

    // Agregar la nota al tipo correspondiente dentro del trimestre
    if (tipo in notasAgrupadasPorTrimestre[trimestre]) {
      notasAgrupadasPorTrimestre[trimestre][tipo].push(valorNota);
    }
  });

  // Asignar el resultado para mostrar en la vista
  this.notasPorTrimestre = notasAgrupadasPorTrimestre;
  console.log('Notas por trimestre del estudiante', idEstudiante, 'en la materia', idMateria, ':', this.notasPorTrimestre);
}


obtenerNotas(): void {
  this.detalleNotasService.obtenerNotasPorAno(this.selectedYear).subscribe(
    (notas: Nota[]) => {
      this.notas = notas;
      this.filtrarNotasEstudianteMateria(1, 130); // Filtra para id_estudiante = 1 y id_dicta = 130

    },
    (error: any) => {
      console.error('Error en la petición de notas:', error);
    }
  );
}


  obtenerEstudiantes(): void {
    this.detalleNotasService.obtenerEstudiantes().subscribe(
      (estudiantes: Estudiante[]) => {
        this.estudiantes = estudiantes;
        this.filteredEstudiantes = estudiantes;
        console.log('Estudiantes obtenidos:', this.estudiantes);
      },
      (error: any) => {
        console.error('Error en la petición de estudiantes:', error);
      }
    );
  }
 // abrir el modal
  abrirModal(trimestre: any): void {
    const dialogRef = this.dialog.open(FormActuaNotasComponent, {
      width: '400px',
      data: {
        ser: trimestre.ser,
        saber: trimestre.saber,
        hacer: trimestre.hacer,
        decidir: trimestre.decidir
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       // this.actualizarNotas(trimestre.id, result);

      }
    });
  }



  agruparNotasPorMateria(): void {
    this.notasPorMateria = {};
    
    this.notas.forEach(nota => {
      const id_dicta = nota.materiaAsignada.id_dicta;
      const trimestre = nota.trimestre;
      const tipo = nota.tipo; // tipo ser hacer decidir
      const notaValue = nota.nota;

      if (!this.notasPorMateria[id_dicta]) {
        this.notasPorMateria[id_dicta] = [];
      }

      let trimestreExistente = this.notasPorMateria[id_dicta].find(t => t.trimestre === trimestre);

      if (!trimestreExistente) {
        trimestreExistente = { trimestre, notasPorTipo: { hacer: [], decidir: [], saber: [], ser: [] } };
        this.notasPorMateria[id_dicta].push(trimestreExistente);
      }

      if (tipo in trimestreExistente.notasPorTipo) {
        trimestreExistente.notasPorTipo[tipo].push(notaValue);
      }
    });

    console.log('Notas agrupadas por materia:', this.notasPorMateria); // Agregar esta línea
  }

  
  convertToNumber(value: string): number {
    return parseFloat(value);
  }

}
