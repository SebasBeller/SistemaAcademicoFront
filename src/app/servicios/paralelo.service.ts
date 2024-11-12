import { Injectable } from '@angular/core';
import {Material} from '../interfaces/material'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
  
})
export class ParaleloService {
  urlApi:string='http://localhost:3000/paralelo'

  constructor(private readonly http: HttpClient) { }

  obtenerParaleloPorNombre(nombreParalelo: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/paralelo?nombre=${nombreParalelo}`);
  }
}
