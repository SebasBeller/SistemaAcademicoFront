// formulario-agregar-contenido.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule

@Component({
  selector: 'app-formulario-agregar-contenido',
  standalone: true,
  templateUrl: './formulario-agregar-contenido.component.html',
  styleUrls: ['./formulario-agregar-contenido.component.scss'],
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule] // Añade MatDialogModule y MatButtonModule aquí
})
export class FormularioAgregarContenidoComponent {
  newModuleName: string;
  newModuleImageUrl: string;

  constructor(
    public dialogRef: MatDialogRef<FormularioAgregarContenidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newModuleName = data.name || '';
    this.newModuleImageUrl = data.imageUrl || '';
  }

  onAdd() {
    this.dialogRef.close({
      name: this.newModuleName,
      imageUrl: this.newModuleImageUrl,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
