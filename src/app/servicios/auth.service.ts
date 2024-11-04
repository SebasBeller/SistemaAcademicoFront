// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    console.log(email);
    console.log(password);
    return this.http.post(this.loginUrl, { email:email, password:password });
  }

   
  saveUserData(user: any): void {

    localStorage.setItem('userId', user.id_estudiante);
    localStorage.setItem('userType', user.tipo);
    localStorage.setItem('userProfilePic', user.foto || '');

    let id:number=0;
    if(user.tipo=="estudiante"){
      id=user.id_estudiante;
    }else{
      id=user.id_profesor
    }

    localStorage.setItem('userId', id.toString());
    localStorage.setItem('userType', user.tipo);  

  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  getUserId(): number | 0 {
    return Number(localStorage.getItem('userId'));
  }
  getUserProfilePic(): string | null {
    return localStorage.getItem('userProfilePic');
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userProfilePic');
  }

  isAuthenticated(): boolean {

    return !!localStorage.getItem('userId');
  }

}


