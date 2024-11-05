import { Component,Input } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { SelectionColorService } from '../../servicios/selection-color.service';
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
  selectedColor: string = '';

  constructor(
    private colorService: SelectionColorService,
    private authService: AuthService,
    private router: Router
  ) {}

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
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response)
        this.authService.saveUserData(response.usuario);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
        console.error('Error en el login:', err);
      }
    });
  }
}