import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../servicios/auth.service'; // Asumimos que tienes un AuthService que maneja la autenticación


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles']; 
    const userRole = this.authService.getUserType(); 
    console.log(userRole)
    console.log(expectedRoles)


    if (expectedRoles.includes(userRole) ) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); 
      return false;
    }
  }
}
