import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerfilEstudianteService } from '../../servicios/perfil-estudiante.service';
import { Estudiante } from '../../interfaces/estudiante';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MensajeService } from '../mensaje/mensaje.component';


import * as bcrypt from 'bcryptjs';
import { CarouselModule     } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CarouselModule ],
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.sass']


})
export class PerfilEstudianteComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  idEstudiante: number | null = null;
  estudianteForm: FormGroup;
  imagenSeleccionada: File | null = null;
  imagenURL: string | null = null;


  constructor(
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
      password: [''],
      repeatPassword: ['']
    });
  }


  selectAvatar(avatar: string): void {
    this.imagenURL = avatar;
    this.estudianteForm.patchValue({ foto: avatar });
      if (this.idEstudiante) {
      localStorage.setItem(`foto_${this.idEstudiante}`, avatar); // Guarda la URL en localStorage

    }
  }



  ngOnInit(): void {
    this.obtenerIdEstudiante();

    if (this.idEstudiante) {
      const storedImage = localStorage.getItem(`foto_${this.idEstudiante}`);
      if (storedImage) {
        this.imagenURL = storedImage; // Usar la URL almacenada
        this.estudianteForm.patchValue({ foto: storedImage });
      }
    }
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
          this.imagenURL = data.foto || '../../../assets/img/silueta.png';
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

      // Verificar si el campo de contraseña ha sido modificado
      if (password && repeatPassword) {
        // Validar que las contraseñas sean iguales y tengan al menos 8 caracteres
        if (password !== repeatPassword) {
          this.mensajeService.mostrarMensajeError("¡Error!", "Las contraseñas no coinciden.");
          return;
        }

        if (password.length < 8) {
          this.mensajeService.mostrarMensajeError("¡Error!", "La contraseña debe tener al menos 8 caracteres.");
          return;
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        estudianteEditado.password = await bcrypt.hash(password, salt);
      } else {
        // Si no se ha ingresado una nueva contraseña, mantener la contraseña existente
        delete estudianteEditado.password;
      }

      this.perfilEstudianteService.actualizarEstudiante(this.idEstudiante, estudianteEditado).subscribe({
        next: (response) => {
          console.log('Estudiante actualizado:', response);
          this.mensajeService.mostrarMensajeExito('¡Éxito!', "Los cambios se realizaron exitosamente");
          location.reload()
        },
        error: (error) => {
          console.error('Error al actualizar el estudiante:', error);
          this.mensajeService.mostrarMensajeError("¡Error!", "Algo ha ocurrido");
        }
      });
    }
  }









}
