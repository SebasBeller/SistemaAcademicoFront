import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Estudiante {
  id_estudiante: number;
  nombre: string;
}

interface Datos {
  estudiante: Estudiante;
  trimestre: number;
  nota: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotasEService {
  private apiUrl = 'http://localhost:3000/nota'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getDatos(): Observable<any[]> {
    return this.http.get<Datos[]>(this.apiUrl).pipe(
      map((data: Datos[]) => {
        // Agrupamos los datos por estudiante
        const estudiantes = data.reduce((acc, curr: Datos) => {
          const estudianteId = curr.estudiante.id_estudiante;
          if (!acc[estudianteId]) {
            acc[estudianteId] = {
              apellido: 'Apellido Placeholder', // Agrega el apellido si tienes esta información
              nombre: curr.estudiante.nombre,
              trimestre1: [] as number[],
              trimestre2: [] as number[],
              trimestre3: [] as number[],
              promedio1: 0, // Promedio para el trimestre 1
              promedio2: 0, // Promedio para el trimestre 2
              promedio3: 0, // Promedio para el trimestre 3
              promedioTotal: 0, // Promedio total
            };
          }

          // Agregar las notas al trimestre correspondiente
          if (curr.trimestre === 1) {
            acc[estudianteId].trimestre1.push(curr.nota);
          } else if (curr.trimestre === 2) {

            acc[estudianteId].trimestre2.push(curr.nota);
          } else if (curr.trimestre === 3) {

            acc[estudianteId].trimestre3.push(curr.nota);
          }

          return acc;
        }, {} as { [key: number]: { apellido: string, nombre: string, trimestre1: number[], trimestre2: number[], trimestre3: number[], promedio1: number, promedio2: number, promedio3: number, promedioTotal: number }});

        // Calcular los promedios por trimestre y el promedio total
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
