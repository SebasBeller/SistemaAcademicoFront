import { Injectable } from '@angular/core';
import { Materia } from '../interfaces/materia';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MateriasProfesorService {

  constructor(private http: HttpClient) {

  }
  materias: Materia[] = [];
obtenerMaterias():Observable<Materia[]>{
  // console.log(this.http.get<Materia[]>('http://localhost:3000/materias').subscribe(response => {
  //   console.log('Datos recibidos:', response);
  // }, error => {
  //   console.error('Error en la petición GET:', error);
  // }))
  return this.http.get<Materia[]>('http://localhost:3000/materias')
}

  // getMaterias(): Materia[] {  
  //   return this.materias;
  // }
  
}
