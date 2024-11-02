import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerfilEstudianteService } from '../../servicios/perfil-estudiante.service';
import { Estudiante } from '../../interfaces/estudiante';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MensajeService } from '../mensaje/mensaje.component';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.sass']
})
export class PerfilEstudianteComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  idEstudiante: number | null = null;
  estudianteForm: FormGroup;

  constructor(
    private perfilEstudianteService: PerfilEstudianteService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private mensajeService: MensajeService
  ) {
    this.estudianteForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      password: [''],           // Agregar control para la contraseña
      repeatPassword: ['']      // Agregar control para repetir la contraseña
    });
  }

  ngOnInit(): void {
    this.obtenerIdEstudiante();
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
          this.estudianteForm.patchValue(data);
        },
        error: (error) => {
          console.error('Error al obtener el estudiante:', error);
        }
      });
    }
  }

  async onGuardar(): Promise<void> {
    if (this.estudianteForm.valid && this.idEstudiante) {
      const estudianteEditado = { ...this.estudianteForm.value };
      const password = estudianteEditado.password;
      const repeatPassword = estudianteEditado.repeatPassword;

      // Validar que las contraseñas sean iguales y tengan al menos 8 caracteres
      if (password !== repeatPassword) {
        this.mensajeService.mostrarMensajeError("¡Error!", "Las contraseñas no coinciden.");
        return;
      }

      if (password.length < 8) {
        this.mensajeService.mostrarMensajeError("¡Error!", "La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      // Eliminar el campo de repetir contraseña antes de enviar al servidor
      delete estudianteEditado.repeatPassword;

      // Encriptar la contraseña
      if (password) {
        const salt = await bcrypt.genSalt(10);
        estudianteEditado.password = await bcrypt.hash(password, salt); // Cambiado a await bcrypt.hash
      }

      this.perfilEstudianteService.actualizarEstudiante(this.idEstudiante, estudianteEditado).subscribe({
        next: (response) => {
          console.log('Estudiante actualizado:', response);
          this.mensajeService.mostrarMensajeExito('¡Éxito', "Los cambios se realizaron exitosamente");
        },
        error: (error) => {
          alert("Error");
          console.error('Error al actualizar el estudiante:', error);
          this.mensajeService.mostrarMensajeError("¡Error!", "Algo ha ocurrido");
        }
      });
    }
  }



}

