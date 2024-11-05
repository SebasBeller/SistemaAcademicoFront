import { Component,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthService} from '../servicios/auth.service'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {
  userRole:string|null="";
  fotoPerfil: string | null = null;
  idEstudiante: number | null = null;

  constructor(private authService: AuthService,private router: Router){

  }
ngOnInit(){
  this.userRole=this.authService.getUserType();
  this.idEstudiante = this.authService.getUserId();
  
  if (this.idEstudiante) {
    this.authService.obtenerFotoPerfil(this.idEstudiante).subscribe({
      next: (data: any) => {
        this.fotoPerfil = data.foto || '../../../assets/img/silueta.png';
        console.log("Foto de perfil cargada desde la API:", this.fotoPerfil);
      },
      error: (error) => {
        console.error('Error al obtener la foto de perfil:', error);
        this.fotoPerfil = '../../../assets/img/silueta.png';
      }
    });
  } else {
    this.fotoPerfil = '../../../assets/img/silueta.png';
  }
}



  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}

