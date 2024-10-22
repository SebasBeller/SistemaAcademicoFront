import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../interfaces/nota';
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';
import { Materias } from '../interfaces/materias'
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto a tu URL de API real

  constructor(private http: HttpClient) {}

  obtenerProfesores(): Observable<MateriaAsignadaDocente[]> {
    return this.http.get<MateriaAsignadaDocente[]>(`${this.apiUrl}/materia-asignada-profesor`);
  }
  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiante`);
  }

  obtenerMateriasAsignadas(): Observable<Materias[]> {
    return this.http.get<Materias[]>(`${this.apiUrl}/materias`);
  }

  obtenerTodasLasNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/nota`);
  }
}
