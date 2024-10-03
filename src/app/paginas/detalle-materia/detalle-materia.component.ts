import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Unidad } from '../../interfaces/unidad';
import { MateriaAsignadaDocente } from '../../interfaces/materia-asignada-docente';
import { UnidadService } from '../../servicios/unidad.service';
import { MateriasProfesorService } from '../../servicios/materias-profesor.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-materia',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './detalle-materia.component.html',
  styleUrls: ['./detalle-materia.component.sass']
})
export class DetalleMateriaComponent implements OnInit {
  cardCounter = 1;
  unidades: Unidad[] = [];
  showForm = false;
  newModuleName = '';
  newModuleImageUrl = '';

  materiaAsiganda?:MateriaAsignadaDocente;
  id_dicta:number;
  unidadServicio:UnidadService = inject(UnidadService)
  materiaAsignadaServicio:MateriasProfesorService = inject(MateriasProfesorService)

  route:ActivatedRoute=inject(ActivatedRoute)

  constructor(private dialog: MatDialog, private router: Router) {
    this.id_dicta=this.route.snapshot.params['id_dicta']
  }

  ngOnInit(): void {
    console.log('ID Dicta:', this.id_dicta); // Agrega este log para verificar el valor

    if (this.id_dicta) { // Asegúrate de que id_dicta no sea undefined
      this.materiaAsignadaServicio.obtenerMateriaAsignada(this.id_dicta).subscribe(
        response => {
          console.log('Datos recibidos:', response);
          this.materiaAsiganda = response;
        },
        error => {
          console.error('Error en la petición GET:', error);
        }
      );

      this.unidadServicio.getUnidadesDeMateriAsignada(this.id_dicta).subscribe(
        response => {
          console.log('Datos recibidos:', response);
          this.unidades = response;
        },
        error => {
          console.error('Error en la petición GET:', error);
        }
      );
    } else {
      console.error('ID Dicta es undefined');
    }
  }

}
