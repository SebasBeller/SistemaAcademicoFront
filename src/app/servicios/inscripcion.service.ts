import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import{MateriaAsignadaDocente} from '../interfaces/materia-asignada-docente';
import{Estudiante} from '../interfaces/estudiante';
@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  urlApi:string='http://localhost:3000/inscripcion'
  constructor(private readonly http: HttpClient) {

  }

  obtenerMaterias(id_estudiante:number):Observable<MateriaAsignadaDocente[]>{
    return this.http.get<MateriaAsignadaDocente[]>(`${this.urlApi}/estudiante/${id_estudiante}`)
  
  }

  obtenerInscritosDeMateriaAsignada(id_dicta:number):Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.urlApi}/estudiantes/${id_dicta}`)
  
  }


}

