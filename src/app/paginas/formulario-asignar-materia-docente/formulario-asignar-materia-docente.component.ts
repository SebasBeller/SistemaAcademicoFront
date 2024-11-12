import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Profesor} from '../../interfaces/profesor'
@Component({
  selector: 'app-formulario-asignar-materia-docente',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './formulario-asignar-materia-docente.component.html',
  styleUrl: './formulario-asignar-materia-docente.component.scss'
})
export class FormularioAsignarMateriaDocenteComponent {
  profesor?: Profesor;
  profesores: Profesor[];
  fecha:Date;

  constructor(
    public dialogRef: MatDialogRef<FormularioAsignarMateriaDocenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profesores= data.profesores || '';
    this.fecha = data.fecha || new Date();
  }
  onAdd() {
    console.log(this.profesor)
    this.dialogRef.close({
      profesor: this.profesor,
      fecha: this.fecha,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }


}
