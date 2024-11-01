import { Component,inject ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {AsistenciaService} from '../../servicios/asistencia.service'
import {Asistencia} from '../../interfaces/asistencia'
import { MatSelectModule } from '@angular/material/select';
import {MateriaAsignadaDocente} from '../../interfaces/materia-asignada-docente';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import {InscripcionService} from '../../servicios/inscripcion.service'
import{Estudiante} from '../../interfaces/estudiante'
@Component({
  selector: 'app-registro-asistencia-docentes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './registro-asistencia-docentes.component.html',
  styleUrls: ['./registro-asistencia-docentes.component.sass']
})
export class RegistroAsistenciaDocentesComponent implements OnInit {
  btnEditar: boolean = true;
  servicioAsistencias:AsistenciaService=inject(AsistenciaService);
  servicioInscripcion:InscripcionService=inject(InscripcionService);
  inscritos:Estudiante[]=[];
  asistenciasEstudiantes: {[key: string]: Asistencia[]|any}[]=[];

  materiaAsignada!:MateriaAsignadaDocente;
  // asistencias: any[]=[];
  filteredAsistencias: any[] = []; // Lista de asistencias filtradas

  displayedColumns: string[]=[] ;
  cambiosAsistencias: any[]=[];
  private readonly currentYear = new Date().getFullYear();
  readonly minDate = new Date(this.currentYear - 20, 0, 1);
  readonly maxDate = new Date(this.currentYear + 1, 11, 31);
  route:ActivatedRoute=inject(ActivatedRoute)
  idMateria!:number;
  constructor() {
    this.idMateria=this.route.snapshot.params['idMateria']
  }


  obtenerAsistencias(){
    this.servicioAsistencias.getAsistenciasDeMateriaAsignada(this.idMateria).subscribe(
      (response: MateriaAsignadaDocente) => {
        this.materiaAsignada = response; 
        console.log(response);

        this.asistenciasEstudiantes=this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.asistencias);
        console.log(this.asistenciasEstudiantes)
        let fechas:string[]= [...this.servicioAsistencias.getUniqueFechas()].sort((fechaAnterior,fechaActual)=>{
          return this.esMayor(fechaAnterior,fechaActual);
        });
        this.displayedColumns=["nombre",...fechas]
        this.filteredAsistencias=this.asistenciasEstudiantes
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )
  }

  esMayor(fechaAnterior:string,fechaActual:string){
    let fechaAnt=new Date(fechaAnterior);
    let fechaAct=new Date(fechaActual);
    return fechaAnt.getTime()-fechaAct.getTime();
  }

  ngOnInit(): void {
   this.obtenerAsistencias();
  }


  getEstadoAsistencia(asistencias: Asistencia[], fecha: string): string {

    return this.servicioAsistencias.getAsistenciaPorFecha(asistencias, fecha)?.estado ||"Falta" ;

  }
  crearNuevasAsistencias(fechaActual:Date,asistencias:any){
    let nuevasAsistencias:Asistencia[]=[]
    for(let registro of asistencias){
      let asistencia={
        fecha_asistencia: fechaActual,
        estado:"Falta"
       }
       let data:any={
        id_dicta:this.materiaAsignada.id_dicta,
        id_estudiante: registro.asistencias[0].estudiante.id_estudiante,
        estudiante: registro.asistencias[0].estudiante,
        ...asistencia
      }
      nuevasAsistencias.push(data)
    }
    return nuevasAsistencias;

  }

  agregarFecha(event: MatDatepickerInputEvent<Date>) {
    const fechaSeleccionada: Date | null = event.value;
    let fechaActual=fechaSeleccionada|| new Date();
    let asistencias=this.crearNuevasAsistencias(fechaActual,this.asistenciasEstudiantes);
    this.servicioAsistencias.guardarAsistencias(asistencias).subscribe(
      (response: any[]) => {
        this.materiaAsignada.asistencias = this.materiaAsignada.asistencias || [];
        response=response.map(asistencia=>{
          asistencia.fecha_asistencia=asistencia.fecha_asistencia.split(" ")[0]
          return asistencia;
        })
        this.materiaAsignada.asistencias=[...response,...this.materiaAsignada.asistencias]
        this.asistenciasEstudiantes =this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.asistencias) ;
        this.filteredAsistencias=this.asistenciasEstudiantes;
        let fechas:string[]= [...this.servicioAsistencias.getUniqueFechas()].sort((fechaAnterior,fechaActual)=>{
          return this.esMayor(fechaAnterior,fechaActual);
        });
        this.displayedColumns=["nombre",...fechas]
      },
      error => {
        console.error('Error en la petición POST:', error);
      }
    )

  }

  
  actualizarAsistencia(asistencias:Asistencia[], fecha:string,event:any){
    let asistencia=this.servicioAsistencias.getAsistenciaPorFecha(asistencias, fecha);
    asistencia!.estado=event.value;
    this.cambiosAsistencias.push({
      id_asistencia: asistencia!.id_asistencia,
      estado:asistencia!.estado
    });
    console.log(asistencia)
    return event.value;
  }

  guardarCambios(){
    this.cambiosAsistencias.forEach(
      (cambios)=>{
        this.servicioAsistencias.actualizarAsistencia(cambios.id_asistencia,cambios).subscribe(
          (response: Asistencia) => {
            console.log('Datos recibidos:', response);
          },
          error => {
            console.error('Error en la petición POST:', error);
          }
        )
      }
    )
  }

  
  editarFecha(fecha: string) {
    const nuevaFecha = prompt(`Editar fecha ${fecha}`, fecha);
    if (nuevaFecha && nuevaFecha !== fecha) {
      const index = this.displayedColumns.indexOf(fecha);
      if (index !== -1) {
        this.displayedColumns[index] = nuevaFecha;
      }
      for (let registro of this.asistenciasEstudiantes) {
        const asistencia = registro["asistencias"].find(
          (a:any) =>   new Date(a.fecha_asistencia+"T00:00:00").toLocaleDateString() === fecha
        ) || registro["asistencias"].find(
          (a:any) =>   new Date(a.fecha_asistencia).toLocaleDateString() === fecha
        ) 
        if (asistencia) {
          asistencia.fecha_asistencia = new Date(nuevaFecha).toLocaleDateString('en-EN');
        }
      }
    }
  }


  eliminarFecha(fecha: string) {
    const confirmacion = confirm(`¿Estás seguro de eliminar la fecha ${fecha}?`);
    if (confirmacion) {
      const index = this.displayedColumns.indexOf(fecha);
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
      }
  
      for (let registro of this.asistenciasEstudiantes) {
        const asistenciaIndex = registro["asistencias"].findIndex((a: Asistencia) => 
          new Date(a.fecha_asistencia).toLocaleDateString() === new Date(fecha).toLocaleDateString()
        );
        if (asistenciaIndex !== -1) {
          registro["asistencias"].splice(asistenciaIndex, 1);
        }
      }
    }
  }
  

  filtrarEstudiantes(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAsistencias = this.asistenciasEstudiantes.filter((asistencia) => 
      asistencia["nombre"].toLowerCase().includes(input)
    );
  }

  get dataSource() {
    return this.filteredAsistencias;
  }
}
