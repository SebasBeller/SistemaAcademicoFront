import { Component, OnInit, inject } from '@angular/core';
import { DetalleNotasEstudiantesService } from '../../servicios/detalle-nota-estudiante.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

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
    private detalleNotasEstudianteService: DetalleNotasEstudiantesService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog  // Inyectar el servicio de MatDialog
  ) {}
  ngOnInit(): void {
    this.cargarNotas();
  }

  cargarNotas(): void {
    this.detalleNotasEstudianteService.getDatosAgrupados(this.idEstudiante, this.idDicta).subscribe(
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
