import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import{MateriaAsignadaDocente} from '../interfaces/materia-asignada-docente';
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


}
