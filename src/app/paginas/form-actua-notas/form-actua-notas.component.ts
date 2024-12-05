import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MensajeService } from '../mensaje/mensaje.component';
import { SelectionColorService } from '../../servicios/selection-color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-actua-notas',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form-actua-notas.component.html',
  styleUrls: ['./form-actua-notas.component.sass']
})
export class FormActuaNotasComponent {
  selectedColor: string = '';
  form: FormGroup;
  serForm: FormGroup;
  saberForm: FormGroup;
  hacerForm: FormGroup;
  decidirForm: FormGroup;

  constructor(
    private colorService: SelectionColorService,
    private fb: FormBuilder,
    private mensajeService:MensajeService,

    private dialogRef: MatDialogRef<FormActuaNotasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      // Validadores para las notas, asegurando que estén en el rango de 0 a 100
      this.form = this.fb.group({
        ser: this.fb.group({
          nota: [data.value.ser[0].nota, [
            Validators.required,
            Validators.min(0),
            Validators.max(100)
          ]]
        }),
        saber: this.fb.group({
          nota: [data.value.saber[0].nota, [
            Validators.required,
            Validators.min(0),
            Validators.max(100)
          ]]
        }),
        hacer: this.fb.group({
          nota: [data.value.hacer[0].nota, [
            Validators.required,
            Validators.min(0),
            Validators.max(100)
          ]]
        }),
        decidir: this.fb.group({
          nota: [data.value.decidir[0].nota, [
            Validators.required,
            Validators.min(0),
            Validators.max(100)
          ]]
        })
      });
      
    this.serForm = this.form.get('ser') as FormGroup;
    this.saberForm = this.form.get('saber') as FormGroup;
    this.hacerForm = this.form.get('hacer') as FormGroup;
    this.decidirForm = this.form.get('decidir') as FormGroup;
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

  actualizarNota() {

    if (this.form.valid) {

      console.log(this.form.value);
      this.mensajeService.mostrarMensajeExito("¡Éxito!","La nota se actualizó con éxito")


      this.dialogRef.close(this.form.value);
    }
    else{
      this.mensajeService.mostrarMensajeError("¡Error!", "Algo salió mal. Verifique que las notas estén entre 0 y 100.");

    }
  }




  cerrar() {
    this.dialogRef.close();
  }
}
