import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import{MateriaAsignadaDocente} from '../interfaces/materia-asignada-docente';
@Injectable({
  providedIn: 'root'
})
export class MateriasProfesorService {
  urlApi:string='http://localhost:3000/materia-asignada-profesor'
  constructor(private http: HttpClient) {

  }
  materias: MateriaAsignadaDocente[] = [];
obtenerMaterias():Observable<MateriaAsignadaDocente[]>{
  // console.log(this.http.get<Materia[]>('http://localhost:3000/materias').subscribe(response => {
  //   console.log('Datos recibidos:', response);
  // }, error => {
  //   console.error('Error en la petición GET:', error);
  // }))
  return this.http.get<MateriaAsignadaDocente[]>(`${this.urlApi}/todas-las-materias`)
  
}
obtenerMateriaAsignada(id:number):Observable<MateriaAsignadaDocente>{
  return this.http.get<MateriaAsignadaDocente>(`${this.urlApi}/${id}`)
}
  // getMaterias(): Materia[] {  
  //   return this.materias;
  // }
  
}
