import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {AsistenciaService} from '../../servicios/asistencia.service'
import {AsistenciaAlumno} from '../../interfaces/asistencia-alumno'
@Component({
  selector: 'app-registro-asistencia-docentes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule
  ],
  templateUrl: './registro-asistencia-docentes.component.html',
  styleUrls: ['./registro-asistencia-docentes.component.sass']
})
export class RegistroAsistenciaDocentesComponent {
  btnEditar: boolean = true;
  // registros = ELEMENT_DATA;
  servicioAsistencias:AsistenciaService=inject(AsistenciaService);
  asitencias:AsistenciaAlumno[]=[];
  displayedColumns: string[] = ['nombre', ...this.servicioAsistencias.getUniqueFechas()];
  // dataSource = ELEMENT_DATA;
  constructor(){
    this.asitencias=this.servicioAsistencias.getAsistencias();
  }
  agregarFila() {
    let fechaActual=new Date().toLocaleDateString("es-ES");
    this.displayedColumns.push(fechaActual)
    for(let registro of this.asitencias){
      registro.asistencias.push({
         fecha: fechaActual,
         estado:"Falta"
        })
    }
  }

  editarFecha() {
    this.btnEditar = !this.btnEditar;
  }

  eliminarFecha() {
    // Lógica para eliminar una fila
  }

  
}
