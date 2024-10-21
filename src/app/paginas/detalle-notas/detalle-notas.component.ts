import { Component, OnInit, inject } from '@angular/core';
import { DetalleNotasService } from '../../servicios/detalle-notas.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private detalleNotasService: DetalleNotasService, private cd: ChangeDetectorRef) {}

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

  // Puedes agregar cualquier lógica adicional aquí si la necesitas
}
