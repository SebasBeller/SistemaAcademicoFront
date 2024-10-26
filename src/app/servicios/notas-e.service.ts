import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estudiante } from '../interfaces/estudiante';

interface Datos {
  estudiante: Estudiante;
  trimestre: number;
  nota: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotasEService {
  private apiUrlNotas = 'http://localhost:3000/nota';
  private apiUrlMateria = 'http://localhost:3000/materia-asignada-profesor';

  constructor(private http: HttpClient) {}

  getDatos(id_dicta: number): Observable<any[]> {
    return this.http.get<Datos[]>(`${this.apiUrlNotas}?id_dicta=${id_dicta}`).pipe(
      map((data: Datos[]) => {
        const estudiantes = data.reduce((acc, curr: Datos) => {
          const estudianteId = curr.estudiante.id_estudiante;
          if (!acc[estudianteId]) {
            acc[estudianteId] = {
              apellido: curr.estudiante.apellido,
              nombre: curr.estudiante.nombre,
              trimestre1: [] as number[],
              trimestre2: [] as number[],
              trimestre3: [] as number[],
              promedio1: 0,
              promedio2: 0,
              promedio3: 0,
              promedioTotal: 0
            };
          }

          if (curr.trimestre === 1) {
            acc[estudianteId].trimestre1.push(curr.nota);
          } else if (curr.trimestre === 2) {
            acc[estudianteId].trimestre2.push(curr.nota);
          } else if (curr.trimestre === 3) {
            acc[estudianteId].trimestre3.push(curr.nota);
          }

          return acc;
        }, {} as { [key: number]: { apellido: string, nombre: string, trimestre1: number[], trimestre2: number[], trimestre3: number[], promedio1: number, promedio2: number, promedio3: number, promedioTotal: number }});

        return Object.values(estudiantes).map(estudiante => {
          estudiante.promedio1 = this.calcularPromedio(estudiante.trimestre1);
          estudiante.promedio2 = this.calcularPromedio(estudiante.trimestre2);
          estudiante.promedio3 = this.calcularPromedio(estudiante.trimestre3);
          estudiante.promedioTotal = this.calcularPromedio([
            estudiante.promedio1,
            estudiante.promedio2,
            estudiante.promedio3
          ]);
          return estudiante;
        });
      })
    );
  }

  getMateriaPorIdDicta(id_dicta: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlMateria}?id_dicta=${id_dicta}`);
  }

  // Método para obtener notas por materia
  getNotasPorMateria(id_dicta: number, materiaId: number): Observable<any[]> {
    return this.http.get<Datos[]>(`${this.apiUrlNotas}?id_dicta=${id_dicta}&${this.apiUrlMateria}id_dicta=${materiaId}`).pipe(
      map((data: Datos[]) => {
        // Similar lógica para mapear los datos
        const estudiantes = data.reduce((acc, curr: Datos) => {
          const estudianteId = curr.estudiante.id_estudiante;
          if (!acc[estudianteId]) {
            acc[estudianteId] = {
              apellido: curr.estudiante.apellido,
              nombre: curr.estudiante.nombre,
              trimestre1: [] as number[],
              trimestre2: [] as number[],
              trimestre3: [] as number[],
              promedio1: 0,
              promedio2: 0,
              promedio3: 0,
              promedioTotal: 0
            };
          }

          if (curr.trimestre === 1) {
            acc[estudianteId].trimestre1.push(curr.nota);
          } else if (curr.trimestre === 2) {
            acc[estudianteId].trimestre2.push(curr.nota);
          } else if (curr.trimestre === 3) {
            acc[estudianteId].trimestre3.push(curr.nota);
          }

          return acc;
        }, {} as { [key: number]: { apellido: string, nombre: string, trimestre1: number[], trimestre2: number[], trimestre3: number[], promedio1: number, promedio2: number, promedio3: number, promedioTotal: number }});

        return Object.values(estudiantes).map(estudiante => {
          estudiante.promedio1 = this.calcularPromedio(estudiante.trimestre1);
          estudiante.promedio2 = this.calcularPromedio(estudiante.trimestre2);
          estudiante.promedio3 = this.calcularPromedio(estudiante.trimestre3);
          estudiante.promedioTotal = this.calcularPromedio([
            estudiante.promedio1,
            estudiante.promedio2,
            estudiante.promedio3
          ]);
          return estudiante;
        });
      })
    );
  }

  private calcularPromedio(notas: number[]): number {
    if (notas.length === 0) return 0;
    return notas.reduce((a, b) => a + b, 0) / notas.length;
  }
}
