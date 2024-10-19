import { Component,inject } from '@angular/core';
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
  constructor(private authService: AuthService,private router: Router){
    this.userRole=this.authService.getUserType();
  }
  logout() {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }


}
