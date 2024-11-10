import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Paralelo} from '../interfaces/paralelo';
import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ParaleloService {
  urlApi:string='http://localhost:3000/paralelo'
  constructor(private readonly http: HttpClient) {
  }
  getParalelo():Observable<Paralelo[]>{
    return this.http.get<Paralelo[]>(this.urlApi);
  }
}
