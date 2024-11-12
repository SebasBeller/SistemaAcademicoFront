import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Paralelo} from '../../interfaces/paralelo'
@Component({
  selector: 'app-formulario-agregar-materia',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './formulario-agregar-materia.component.html',
  styleUrl: './formulario-agregar-materia.component.scss',

})
export class FormularioAgregarMateriaComponent {
  newMateriaName: string;
  paralelos: Paralelo[]=[];
  paralelo?:Paralelo;

  constructor(
    public dialogRef: MatDialogRef<FormularioAgregarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newMateriaName = data.name || '';
    this.paralelos = data.paralelos || '';
  }
  onAdd() {
    console.log(this.paralelo)
    this.dialogRef.close({
      name: this.newMateriaName,
      paralelo: this.paralelo,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
