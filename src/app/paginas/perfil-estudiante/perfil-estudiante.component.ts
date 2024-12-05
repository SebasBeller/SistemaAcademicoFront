import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerfilEstudianteService } from '../../servicios/perfil-estudiante.service';
import { Estudiante } from '../../interfaces/estudiante';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MensajeService } from '../mensaje/mensaje.component';
import { SelectionColorService } from '../../servicios/selection-color.service';

import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.sass']
})

export class PerfilEstudianteComponent implements OnInit {
  selectedColor: string = '';
  estudiantes: Estudiante[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  idEstudiante: number | null = null;
  estudianteForm: FormGroup;
  imagenSeleccionada: File | null = null;
  imagenURL: string | null = null;


  constructor(
    private colorService: SelectionColorService,
    private perfilEstudianteService: PerfilEstudianteService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private mensajeService: MensajeService

  ) {
    this.estudianteForm = this.fb.group({
      foto: [],
      nombre: [{ value: '', disabled: true }],
      apellido: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      currentPassword: [''],
      newPassword: [''],
      repeatNewPassword: ['']
    },
    { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const repeatNewPassword = form.get('repeatNewPassword')?.value;
    return newPassword === repeatNewPassword ? null : { mismatch: true };
  }

  selectAvatar(avatar: string): void {
    this.imagenURL = avatar;
    this.estudianteForm.patchValue({ foto: avatar });
    if (this.idEstudiante) {
      localStorage.setItem(`foto_${this.idEstudiante}`, avatar);
    }
  }

  ngOnInit(): void {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
      console.log('Color recibido en Login:', this.selectedColor);
    });
    this.obtenerIdEstudiante();

    if (this.idEstudiante) {
      const storedImage = localStorage.getItem(`foto_${this.idEstudiante}`);
      if (storedImage) {
        this.imagenURL = storedImage; // Usar la URL almacenada
        this.estudianteForm.patchValue({ foto: storedImage });
      }



    }
  }

  getColorClass(): string {
    const colorClasses: { [key: string]: string } = {
      'verde': 'color-verde',
      'amarillo': 'color-amarillo',
    };
    return colorClasses[this.selectedColor] || 'color-azul';
  }

  obtenerIdEstudiante(): void {
    this.route.paramMap.subscribe(params => {
      this.idEstudiante = +params.get('id')!;
      console.log('ID del estudiante:', this.idEstudiante);
      this.obtenerDetallesEstudiante();
    });
  }

  obtenerDetallesEstudiante(): void {
    if (this.idEstudiante) {
      this.perfilEstudianteService.obtenerEstudiantePorId(this.idEstudiante).subscribe({
        next: (data: Estudiante) => {
          this.estudianteSeleccionado = data;
          this.establecerVarloresFormulario(data);
          this.imagenURL = data.foto || '../../../assets/img/silueta.png';
        },
        error: (error) => {
          console.error('Error al obtener el estudiante:', error);
        }
      });
    }
  }
establecerVarloresFormulario(data: Estudiante): void{
  this.estudianteForm.patchValue({
    nombre:data.nombre,
    apellido:data.apellido,
    email:data.email

  });
}

async onGuardar(): Promise<void> {
  try {
    if (this.estudianteForm.valid && this.idEstudiante && this.estudianteSeleccionado) {
      const estudianteEditado = { ...this.estudianteForm.value };

      // Validar contraseña actual
      if (this.estudianteSeleccionado.password && estudianteEditado.currentPassword) {
        const passwordCorrecta = await bcrypt.compare(estudianteEditado.currentPassword, this.estudianteSeleccionado.password);
        if (!passwordCorrecta) {
          this.mensajeService.mostrarMensajeError("¡Error!", "La contraseña actual es incorrecta.");
          return;
        }
      }

      // Validar nueva contraseña
      if (estudianteEditado.newPassword) {
        if (estudianteEditado.newPassword.length < 8) {
          throw new Error("La nueva contraseña debe tener al menos 8 caracteres.");
        }
        const salt = await bcrypt.genSalt(10);
        estudianteEditado.password = await bcrypt.hash(estudianteEditado.newPassword, salt);
      }

      // Actualizar estudiante
      this.perfilEstudianteService.actualizarEstudiante(this.idEstudiante, estudianteEditado).subscribe({
        next: () => {
          this.mensajeService.mostrarMensajeExitoConCallback('¡Éxito!', "Los cambios se realizaron exitosamente").then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        },
        error: (err) => {
          console.error('Error al actualizar el estudiante:', err);
          this.mensajeService.mostrarMensajeError("¡Error!", "Algo ocurrió. Intente de nuevo más tarde.");
        }
      });
    }
  } catch (err) {
    console.error(err);
    this.mensajeService.mostrarMensajeError("¡Error!", (err as Error).message);
  }
}
















}
