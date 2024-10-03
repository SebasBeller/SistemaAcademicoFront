import { Injectable } from '@angular/core';
import {Material} from '../interfaces/material'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  materiales:Material[]=[]
  urlApi:string='http://localhost:3000/material'
  constructor(private http: HttpClient) { }
  getMateriales():Material[]{
    return this.materiales;
  }
  encontrarMaterial(id?:number):Observable<Material> {
    return this.http.get<Material>(`${this.urlApi}/${id}`);
  }
  getMaterialesDeUnidad(id?:number):Observable<Material[]> {
    return this.http.get<Material[]>(`${this.urlApi}/unidad/${id}`);
  }
  guardadMaterial(material:Material):Observable<number> {
    return this.http.post<Material>(`${this.urlApi}`, material)
    .pipe(
      map((response: Material) => response.id_material || 1) 
    );
  }
}
