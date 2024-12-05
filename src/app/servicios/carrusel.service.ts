import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarruselService {

  private apiUrl = 'https://6751d4fbd1983b9597b48655.mockapi.io/imagenes'; // Aquí va la URL de la Fake API


  constructor(private http: HttpClient) {}

  // Método para obtener las imágenes
  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}