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
import { SelectionColorService } from '../../servicios/selection-color.service';
import * as bcrypt from 'bcryptjs'
import { MensajeService } from '../mensaje/mensaje.component';

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
  selectedColor: string = '';
  profesor: Profesor;
  profesores: Profesor[] = [];
  plainPassword: string = ''; 
  passwordVisible: boolean = false; 




  constructor(
    private colorService: SelectionColorService,
    public dialogRef: MatDialogRef<FormEditarProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profesor,
    private profesorService: ProfesorService,
    private mensajeServicce:MensajeService
  ) {
    this.profesor = { ...data };
    this.profesorService.getProfesores().subscribe({
      next: (profesores) => (this.profesores = profesores),
      error: (error) => console.error('Error al obtener los profesores:', error),
    });
     this.plainPassword = '';
    
  }

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
      console.log('Color recibido en Login:', this.selectedColor);
    });
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
  async generateDefaultPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.plainPassword, salt);
    console.log('Contraseña hasheada:', hashedPassword);
    return hashedPassword;
  }
  idProfesorExiste(id: number): boolean {
    return this.profesores.some((profesor) => profesor.id_profesor === id);
  }

  async guardar() {
    // Verificar si los campos están completos
    const camposCompletos = 
    this.profesor.nombre.trim() !== '' &&
    this.profesor.apellido.trim() !== '' &&
    this.profesor.email.trim() !== '';

  if (!camposCompletos) {
    this.mensajeServicce.mostrarMensajeError("Error!!!", "Complete todos los campos");
    return; // Si hay campos vacíos, no continuar con el guardado
  }
     // Si todos los campos están completos, proceder a guardar
     const hashedPassword = await this.generateDefaultPassword(); // Hashear la contraseña
     const profesorData = {
       id_profesor: this.profesor.id_profesor,
       nombre: this.profesor.nombre,
       apellido: this.profesor.apellido,
       email: this.profesor.email,
       password: hashedPassword
     };
 
     this.profesorService.addProfesor(profesorData).subscribe({
       next: (newProfesor) => {
         this.mensajeServicce.mostrarMensajeExito("Exito!!!", "Profesor agregado correctamente");
         console.log('Profesor agregado:', newProfesor);
         this.dialogRef.close(newProfesor);
       },
       error: (error) => {
         this.mensajeServicce.mostrarMensajeError("Error :(", "No se pudo añadir al profesor");
         console.error('Error al agregar el profesor:', error);
       },
     });
   }
  cancelar() {
    this.dialogRef.close();
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
