import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../mensaje/mensaje.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
     private router: Router,
    private mensajeService: MensajeService) {}

    login() {
      this.authService.login(this.email, this.password).subscribe({
          next: (response) => {
              console.log("Respuesta completa del login:", response);
              if (response && response.usuario) {
                  this.authService.saveUserData(response.usuario);
                  this.router.navigate(['/home']);
              } else {
                  console.error("La respuesta no contiene los datos esperados de usuario.");
                  this.mensajeService.mostrarMensajeError("Error", "Datos de usuario no recibidos.");
              }
          },
          error: (err) => {
              console.error('Error en el login:', err);
              this.mensajeService.mostrarMensajeError("¡Error!", "La contraseña o su correo es incorrecto");
          }
      });
  }




}

