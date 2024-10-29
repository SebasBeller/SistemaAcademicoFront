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
  templateUrl: './detalle-notas-estudiantes.component.html',
  styleUrls: ['./detalle-notas-estudiantes.component.sass'],
})
export class DetalleNotasEstudiantesComponent implements OnInit {
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
}
