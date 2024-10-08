import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Unidad} from '../interfaces/unidad';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  apiUrl:string='http://localhost:3000/unidad'
  constructor(private http: HttpClient) { }
  getUnidadesDeMateriAsignada(id_dicta:number):Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.apiUrl}/materia-asignada/`+id_dicta)
  }
  guardarUnidadDeMateriAsignada(unidad:Unidad):Observable<number> {
    return this.http.post<Unidad>(`${this.apiUrl}`, unidad)
    .pipe(
      map((response: Unidad) => response.id_unidad || 1) 
    );
  }
}
