import { Component, OnInit ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service'
import {Estudiante} from'../../interfaces/estudiante'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-lista-estudiantes-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-estudiantes-profesor.component.html',
  styleUrl: './lista-estudiantes-profesor.component.scss'
})
export class ListaEstudiantesProfesorComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  route:ActivatedRoute=inject(ActivatedRoute);
  id_dicta!:number;

  constructor(private materiaAsignadaService: MateriasProfesorService) {
    this.id_dicta=this.route.snapshot.params["id_dicta"]
  }

  ngOnInit() {
    // this.estudiantesService.obtenerEstudiantes().subscribe(data => {
    //     this.estudiantes = data.filter((estudiante: any) => estudiante.nombre);
    //     console.log(this.estudiantes);
    // });
    this.materiaAsignadaService.obtenerEstudiantesMateriaAsignada(this.id_dicta).subscribe(
      data => {
            this.estudiantes = data;
            console.log(data);
      }
    );

}
}
