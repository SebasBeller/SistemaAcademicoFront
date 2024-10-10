import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import{MateriaAsignadaDocente} from '../interfaces/materia-asignada-docente';
import {Estudiante} from '../interfaces/estudiante'
@Injectable({
  providedIn: 'root'
})
export class MateriasProfesorService {
  urlApi:string='http://localhost:3000/materia-asignada-profesor'
  constructor(private readonly http: HttpClient) {

  }
  materias: MateriaAsignadaDocente[] = [];
obtenerMaterias():Observable<MateriaAsignadaDocente[]>{
  return this.http.get<MateriaAsignadaDocente[]>(`${this.urlApi}/todas-las-materias`)

}
obtenerMateriaAsignada(id:number):Observable<MateriaAsignadaDocente>{
  return this.http.get<MateriaAsignadaDocente>(`${this.urlApi}/${id}`)
}
obtenerEstudiantesMateriaAsignada(id:number):Observable<Estudiante[]>{
  return this.http.get<Estudiante[]>(`${this.urlApi}/estudiantes/${id}`)
}

}
