import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {Paralelo} from '../../interfaces/paralelo';
import {MensajeService} from '../mensaje/mensaje.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-formulario-agregar-materia',
  standalone: true,
  imports: [CommonModule,
     FormsModule,
     MatDialogModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
    ],
  templateUrl: './formulario-agregar-materia.component.html',
  styleUrl: './formulario-agregar-materia.component.sass',

})
export class FormularioAgregarMateriaComponent {
  newMateriaName: string;
  paralelos: Paralelo[]=[];
  paralelo?:Paralelo;
  
  constructor(
    public dialogRef: MatDialogRef<FormularioAgregarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly mensajeService:MensajeService
  ) {
    this.newMateriaName = data.name || '';
    this.paralelos = data.paralelos || '';
  }
  onAdd() {
    if(!this.newMateriaName || ! this.paralelo){
      this.mensajeService.mostrarMensajeError("Error!!!","Complete todos los campos!!")
      return;
    }
    this.dialogRef.close({
      name: this.newMateriaName,
      paralelo: this.paralelo,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
