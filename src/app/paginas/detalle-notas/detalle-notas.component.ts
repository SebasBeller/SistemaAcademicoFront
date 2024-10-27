import { Component, OnInit, inject } from '@angular/core';
import { DetalleNotasService } from '../../servicios/detalle-notas.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormActuaNotasComponent } from '../form-actua-notas/form-actua-notas.component';

@Component({
  selector: 'app-detalle-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-notas.component.html',
  styleUrls: ['./detalle-notas.component.sass'],
})
export class DetalleNotasComponent implements OnInit {
  notasPorTrimestre: { [key: number]: any } = {}; 
  idEstudiante =1;
  idDicta = 130;  

  constructor(
    private detalleNotasService: DetalleNotasService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog  // Inyectar el servicio de MatDialog
  ) {}
  ngOnInit(): void {
    this.cargarNotas();
  }

  cargarNotas(): void {
    this.detalleNotasService.getDatosAgrupados(this.idEstudiante, this.idDicta).subscribe(
      (datosAgrupados) => {
        this.notasPorTrimestre = datosAgrupados;
        console.log('Notas agrupadas por trimestre:', this.notasPorTrimestre);
        this.cd.detectChanges();  // Forzar actualización de la vista
      },
      (error) => {
        console.error('Error al cargar las notas', error);
      }
    );
  }

 // Método para abrir el modal
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
        this.actualizarNotas(trimestre.id, result);
      }
    });
  }

  actualizarNotas(id: number, notasActualizadas: any): void {
    this.detalleNotasService.actualizarAsistencia(id, notasActualizadas).subscribe(
      (respuesta) => {
        console.log('Notas actualizadas:', respuesta);
        this.cargarNotas();  // Recargar las notas después de la actualización
      },
      (error) => {
        console.error('Error al actualizar las notas', error);
      }
    );
  }
}
