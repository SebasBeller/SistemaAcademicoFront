import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../interfaces/asistencia';
import { Profesor } from '../interfaces/profesor';
import { Materia } from '../interfaces/materia';
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialAsistenciaService {
  private readonly asistenciaUrl = 'http://localhost:3000/Asistencia';
  private readonly profesorUrl = 'http://localhost:3000/Profesor';
  private readonly materiasAsignadasUrl = 'http://localhost:3000/materia-asignada-profesor';
  private readonly materiasUrl = 'http://localhost:3000/materias';

  constructor(private readonly http: HttpClient) {}

  obtenerAsistencias(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.asistenciaUrl);
  }

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.profesorUrl);
  }

  obtenerMateriasAsignadas(): Observable<MateriaAsignadaDocente[]> {
    return this.http.get<MateriaAsignadaDocente[]>(this.materiasAsignadasUrl)
    ;
  }

  obtenerMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.materiasUrl);
  }
   // Obtener las asistencias filtradas por id_estudiante y id_dicta
   obtenerAsistenciasPorEstudianteYMateria(id_estudiante: number, id_dicta: number): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${this.asistenciaUrl}/asistencias`).pipe(
      map(asistencias =>
        asistencias.filter(asistencia =>
          asistencia.estudiante?.id_estudiante === id_estudiante &&
          asistencia.materiaAsignada.id_dicta === id_dicta
        )
      )
    );
  }
}
