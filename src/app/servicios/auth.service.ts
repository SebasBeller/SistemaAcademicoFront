// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/auth/login';  // URL del login backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email:email, password:password });
  }

   
  saveUserData(user: any): void {
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

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userId');  
  }
}