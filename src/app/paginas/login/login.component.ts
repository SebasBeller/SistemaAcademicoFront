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
        console.log(response)
        this.authService.saveUserData(response.usuario);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.mensajeService.mostrarMensajeError("¡Erro!","La contraseña o su correo es incorrecto")
        console.error('Error en el login:', err);
      }
    });
  }
}
