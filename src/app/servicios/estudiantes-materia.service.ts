import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { EstudiantesMateria } from '../interfaces/Lista-estudiantes-materia';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  urlApi:string = 'http://localhost:3000/estudiante'
  constructor(private http: HttpClient) { }

  obtenerEstudiantes(): Observable<EstudiantesMateria[]> {
    return this.http.get<any[]>(this.urlApi).pipe(
      map(estudiantes => estudiantes.map(estudiante => ({
        id_estudiante: estudiante.id_estudiante,
        nombre: estudiante.nombre
      })))
    );
  }
}
