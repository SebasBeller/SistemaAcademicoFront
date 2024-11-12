import { Component, OnInit ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EstudiantesAdminService} from '../../servicios/estudiantes-admin.service'
import {Estudiante} from'../../interfaces/estudiante'
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ParaleloService } from '../../servicios/paralelo.service';


@Component({
  selector: 'app-admin-ver-estudiantes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-ver-estudiantes.component.html',
  styleUrl: './admin-ver-estudiantes.component.sass'
})
export class AdminVerEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  mostrarFormulario = false;
  editando = false;
  estudiante: Estudiante = {
    id_estudiante: 0,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    paralelo: { nombre:'', id:0, paralelo:''}, // Asegúrate de asignar un objeto con las propiedades id_paralelo y paralelo
    foto: ''
  };
  paraleloInput: string = '';


  constructor(
    private estudiantesService: EstudiantesAdminService,
    private paraleloService: ParaleloService
  ) {}

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes(): void {
    this.estudiantesService.obtenerListaEstudiantes().subscribe(
      (data) => (this.estudiantes = data),
      (error) => console.error('Error al obtener estudiantes:', error)
    );
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.estudiante = { id_estudiante: 0, nombre: '', apellido: '', email: '', password: '',   paralelo: { nombre:'', id:0, paralelo:''}, foto: '' };

    // Obtener el último ID y generar el nuevo ID
    this.estudiantesService.obtenerUltimoEstudiante().subscribe(
      (ultimoEstudiante) => {
        const nuevoId = ultimoEstudiante ? ultimoEstudiante.id_estudiante + 1 : 1;
        this.estudiante.id_estudiante = nuevoId;
      },
      (error) => console.error('Error al obtener el último estudiante:', error)
    );
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  generarEmailYPassword(): void {
    if (this.estudiante.nombre && this.estudiante.apellido) {
      const nombreLower = this.estudiante.nombre.toLowerCase();
      const apellidoLower = this.estudiante.apellido.toLowerCase();
      this.estudiante.email = `${nombreLower}.${apellidoLower}@example.com`;
      this.estudiante.password = 'password123';
    }
  }

guardarEstudiante(): void {
  console.log("Guardar Estudiante - método invocado");  // Verificación de ejecución

  // Verificar si paraleloInput tiene un valor
  if (!this.paraleloInput) {
    console.error("El campo paralelo está vacío");
    return;
  }

  // Obtener el ID del paralelo por el nombre proporcionado en paraleloInput
  this.paraleloService.obtenerParaleloPorNombre(this.paraleloInput).subscribe(
    (paralelo) => {
      if (paralelo) {
        if (!this.estudiante.paralelo) {
          this.estudiante.paralelo = { nombre: '', id: 0, paralelo: '' };
        }

        this.estudiante.paralelo.id = paralelo.id;
        this.estudiante.paralelo.nombre = paralelo.nombre;
        this.estudiante.paralelo.paralelo = paralelo.paralelo;

        if (this.editando) {
          // Actualizar estudiante
          this.estudiantesService.actualizarEstudiante(this.estudiante.id_estudiante, this.estudiante).subscribe(
            () => {
              console.log("Estudiante actualizado correctamente");
              this.obtenerEstudiantes();
              this.cerrarFormulario();
            },
            (error) => console.error('Error al actualizar estudiante:', error)
          );
        } else {
          // Agregar nuevo estudiante
          this.estudiantesService.addEstudiante(this.estudiante).subscribe(
            () => {
              console.log("Estudiante agregado correctamente");
              this.obtenerEstudiantes();
              this.cerrarFormulario();
            },
            (error) => console.error('Error al agregar estudiante:', error)
          );
        }
      } else {
        console.error('Paralelo no encontrado');
      }
    },
    (error) => console.error('Error al buscar paralelo:', error)
  );
}

  

  editarEstudiante(id: number): void {
    this.estudiantesService.obtenerEstudiantePorId(id).subscribe(
      (data) => {
        this.estudiante = data;
        this.paraleloInput = data.paralelo?.paralelo || '';
        console.log(this.paraleloInput);
        this.mostrarFormulario = true;
        this.editando = true;
      },
      (error) => console.error('Error al obtener estudiante:', error)
    );
  }
}
