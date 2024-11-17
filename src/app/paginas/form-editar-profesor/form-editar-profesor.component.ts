import { Component,Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesor } from '../../interfaces/profesor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfesorService } from '../../servicios/profesor.service';
import { updateMetadata } from '@angular/fire/storage';
@Component({
  selector: 'app-form-editar-profesor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-editar-profesor.component.html',
  styleUrl: './form-editar-profesor.component.sass'
})
export class FormEditarProfesorComponent {
  profesor: Profesor;

  constructor(
    public dialogRef: MatDialogRef<FormEditarProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profesor,
    private profesorService: ProfesorService
  ) {
    this.profesor = { ...data }; 
  }

  guardar() {
    const profesorData = {
      nombre: this.profesor.nombre,
      apellido: this.profesor.apellido,
      email: this.profesor.email
    };
  
    this.profesorService.updateProfesor(this.profesor.id_profesor, profesorData).subscribe({
      next: (updatedProfesor) => {
        console.log('Profesor actualizado:', updatedProfesor);
        this.dialogRef.close(updatedProfesor);
      },
      error: (error) => {
        console.error('Error al actualizar el profesor:', error);
      }
    });
  }
  cancelar() {
    this.dialogRef.close();
  }
}
