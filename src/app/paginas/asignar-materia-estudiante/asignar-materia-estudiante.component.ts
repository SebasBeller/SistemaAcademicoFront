import { Component ,inject} from '@angular/core';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-asignar-materia-estudiante',
  standalone: true,
  imports: [CommonModule,FormsModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './asignar-materia-estudiante.component.html',
  styleUrl: './asignar-materia-estudiante.component.sass'
})
export class AsignarMateriaEstudianteComponent {
  selectedColor: string = '';
  profesoresAsignadosAMateria:any[]=[];
  id_materia:number=0;
  route:ActivatedRoute=inject(ActivatedRoute);
  constructor(private colorService: SelectionColorService, private materiasProfesorService: MateriasProfesorService,){
    this.id_materia=this.route.snapshot.params['id_materia']
  }

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
      console.log('Color recibido en Login:', this.selectedColor);
    });

            this.materiasProfesorService.obtenerMaterias().subscribe(
          response=>{
            let asignacionesMateria=response.filter((materiaAsignada)=>materiaAsignada.materia?.id_materia==this.id_materia);
            console.log(asignacionesMateria)
            this.profesoresAsignadosAMateria=asignacionesMateria.map((materiaAsignada)=>materiaAsignada.profesor)
          },
            error=>{
              console.log(error)
            }
          )
  }

  getColorClass(): string {
    switch (this.selectedColor) {
      case 'verde':
        return 'color-verde';
      case 'amarillo':
        return 'color-amarillo';
      default:
        return 'color-azul';
    }
  }

}
