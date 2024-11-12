import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../interfaces/profesor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProfesorService } from '../../servicios/profesor.service';
@Component({
  selector: 'app-ver-lista-profesores',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ver-lista-profesores.component.html',
  styleUrl: './ver-lista-profesores.component.sass'
})
export class VerListaProfesoresComponent implements OnInit {
  profesores: Profesor[] = [];
  profesoresFiltrados: Profesor[] = [];
  terminoBusqueda: string = '';
  profesorSeleccionado: Profesor | null = null; // Profesor actualmente en edición

  constructor(private profesorService: ProfesorService) {}
  
  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores() {
    this.profesorService.getProfesores().subscribe(
      (data) => {
        this.profesores = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los profesores:', error);
      }
    );
  }
   editarProfesor(profesor: Profesor) {
    this.profesorSeleccionado = { ...profesor }; // Crea una copia del profesor seleccionado
  }

  actualizarProfesor(id: number, profesorData: Partial<Profesor>) {
    this.profesorService.updateProfesor(id, profesorData).subscribe(
      (updatedProfesor) => {
        console.log('Profesor actualizado:', updatedProfesor);
        // Actualiza la lista de profesores después de actualizar
        this.getProfesores();
      },
      (error) => {
        console.error('Error al actualizar el profesor:', error);
      }
    );
  }
  filtrarProfesores(): void {
    const termino = this.terminoBusqueda.toLowerCase(); 
    this.profesoresFiltrados = this.profesores.filter(profesor =>
      profesor.nombre.toLowerCase().includes(termino) ||
      profesor.apellido.toLowerCase().includes(termino) 
    );
  }
  guardarCambios() {
    if (this.profesorSeleccionado) {
      this.profesorService.updateProfesor(this.profesorSeleccionado.id_profesor, this.profesorSeleccionado).subscribe(
        (updatedProfesor) => {
          console.log('Profesor actualizado:', updatedProfesor);
          this.getProfesores(); // Refresca la lista de profesores
          this.profesorSeleccionado = null; // Cierra el modo de edición
        },
        (error) => {
          console.error('Error al actualizar el profesor:', error);
        }
      );
    }
  }
  // Cancela la edición
  cancelarEdicion() {
    this.profesorSeleccionado = null;
  }
  
}
