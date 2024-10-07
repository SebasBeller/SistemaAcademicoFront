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

  editarFecha(fecha:string) {
    const nuevaFecha = prompt('Editar fecha ${fecha}', fecha);
    if(nuevaFecha && nuevaFecha !== fecha){
      const index = this.displayedColumns.indexOf(fecha);
      if(index !== -1){
        this.displayedColumns[index] = nuevaFecha;
      }
      for(let registro of this.asitencias){
        const asistencia = registro.asistencias.find(a=> a.fecha === fecha);
        if(asistencia){
          asistencia.fecha = nuevaFecha;
        }
      }
    }
  }

  eliminarFecha(fecha:string) {
    const confirmacion = confirm(`Estas seguro de eliminar la fecha ${fecha}`);
    if(confirmacion){
      const index = this.displayedColumns.indexOf(fecha);
      if(index !== -1){
        this.displayedColumns.splice(index,1);
      }

      for(let registro of this.asitencias){
        const asistenciaIndex = registro.asistencias.findIndex(a =>a.fecha);
        if (asistenciaIndex !== -1){
          registro.asistencias.splice(asistenciaIndex, 1);
        }
      }
    }
  }

  
}
