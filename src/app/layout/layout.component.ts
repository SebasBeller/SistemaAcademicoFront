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
  this.fotoPerfil = this.authService.getUserProfilePic();
  this.idEstudiante = this.authService.getUserId();

  console.log("Foto de perfil cargada:", this.fotoPerfil);
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}

