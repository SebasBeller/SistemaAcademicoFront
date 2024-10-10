import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MateriaAsignadaDocente } from '../interfaces/materia-asignada-docente';
import { Asistencia } from '../interfaces/asistencia';
import { map } from 'rxjs/operators';
// import { parse, format } from 'date-fns';
@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  asistencias: any = {};
  private urlApi: string =
    'http://localhost:3000/materia-asignada-profesor/asistencias';

  constructor(private http: HttpClient) {}

  getAsistenciasDeMateriaAsignada(
    id?: number
  ): Observable<MateriaAsignadaDocente> {
    return this.http.get<MateriaAsignadaDocente>(`${this.urlApi}/${id}`);
  }
  
  getAsistenciasAgrupadasPor(asistencias?: any[],grupo?:string):any[]{
    return Object.entries(
      asistencias?.reduce((acc: any, asistencia: any) => {
        const nombreEstudiante = asistencia.estudiante?.nombre || 'Mariana';
          (acc[nombreEstudiante] = acc[nombreEstudiante] || []).push(
            asistencia
          );
        return acc;
      }, {})
    ).map(([nombre, asistencias]) => ({ nombre, asistencias }));
  }
  getAsistenciasAgrupadasPorEstudiante(asistencias?: any[],grupo?:string): any[] {
    this.asistencias = this.getAsistenciasAgrupadasPor(asistencias,grupo);
    return this.asistencias;
  }

  getUniqueFechas(): string[] {
    const fechas = new Set<string>();
    this.asistencias.forEach((alumno: any) => {
      alumno.asistencias.forEach((asistencia: Asistencia) => {
        let fecha=new Date(asistencia.fecha_asistencia+"T00:00:00").toLocaleDateString()
        fechas.add(fecha);
      });
    });
    return Array.from(fechas);
  }

  getEstadoAsistencia(asistencias: Asistencia[], fecha: string): string {
        
    const asistencia = asistencias.find(
      (a) => 
            new Date(a.fecha_asistencia+"T00:00:00").toLocaleDateString() === fecha
    );
    return asistencia ? asistencia.estado : 'Falta';
  }

  guardarAsistencia(asistencia:Asistencia):Observable<number>{
    return this.http.post<Asistencia>("http://localhost:3000/asistencia", asistencia)
    .pipe(
      map((response: Asistencia) => response.id_asistencia|| -1) 
    );
  }
  guardarAsistencias(asistencia:Asistencia[]):Observable<Asistencia[]>{
    return this.http.post<Asistencia[]>("http://localhost:3000/asistencia/all", asistencia)
  }

  actualizarAsistencia(id:number,asistencia:any):Observable<Asistencia>{
    return this.http.patch<Asistencia>(`http://localhost:3000/asistencia/${id}`, asistencia)
  }
   // Método para obtener asistencias por estudiante y materia
   getAsistenciasPorEstudianteYMateria(idEstudiante: number, idMateria: number): Observable<Asistencia[]> {
    const url = `${this.urlApi}/estudiante/${idEstudiante}/materia/${idMateria}`;
    return this.http.get<Asistencia[]>(url);
  }
}
