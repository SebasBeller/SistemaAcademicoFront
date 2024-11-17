import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../interfaces/profesor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProfesorService } from '../../servicios/profesor.service';
import { MatDialog } from '@angular/material/dialog';
import { FormEditarProfesorComponent } from '../form-editar-profesor/form-editar-profesor.component';

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
  profesorSeleccionado: Profesor | null = null; 

  constructor(private profesorService: ProfesorService,public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores() {
    this.profesorService.getProfesores().subscribe(
      (data: Profesor[]) => {
        this.profesores = data;
        this.profesoresFiltrados=data;
        console.log('profesores:',this.profesores);
      },
      (error) => {
        console.error('Error al obtener los profesores:', error);
      }
    );
  }
  editarProfesor(profesor: Profesor) {
    const dialogRef = this.dialog.open(FormEditarProfesorComponent, {
      width: '300px',
      data: profesor
    });

    dialogRef.afterClosed().subscribe((result: Profesor | undefined) => {
      if (result) {
        this.actualizarProfesor(result.id_profesor, result);
      }
    });
  }
  
  actualizarProfesor(id: number, profesorData: Partial<Profesor>) {
    this.profesorService.updateProfesor(id, profesorData).subscribe(
      (updatedProfesor) => {
        console.log('Profesor actualizado:', updatedProfesor);
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
