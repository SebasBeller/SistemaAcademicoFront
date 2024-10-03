import { Injectable } from '@angular/core';
import {AsistenciaAlumno} from '../interfaces/asistencia-alumno';
import {Asistencia} from '../interfaces/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  asistencias: AsistenciaAlumno[] = [
    {
      nombre: 'Fernandez Lucas',
      asistencias: [
        { fecha: "2/9/2024", estado: "Asistió" },
        { fecha: "3/9/2024", estado: "No Asistió" }
      ]
    },
    {
      nombre: 'Martinez Juan',
      asistencias: [
        { fecha: "2/9/2024", estado: "Asistió" },
        { fecha: "3/9/2024", estado: "Asistió" }
      ]
    }
  ];
  constructor() { }
  getAsistencias():AsistenciaAlumno[]{
    return this.asistencias
  }

  getUniqueFechas(): string[] {
    const fechas = new Set<string>();
    this.asistencias.forEach(alumno => {
      alumno.asistencias.forEach(asistencia => {
        fechas.add(asistencia.fecha);
      });
    });
    return Array.from(fechas);
  }

  getEstadoAsistencia(asistencias: Asistencia[], fecha: string): string {
    const asistencia = asistencias.find(a => a.fecha === fecha);
    return asistencia ? asistencia.estado : '-';
  }
}
