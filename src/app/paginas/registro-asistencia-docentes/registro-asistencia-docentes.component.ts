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
import { MensajeService } from '../mensaje/mensaje.component';
import Swal from 'sweetalert2';
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
  materiaAsignada!:MateriaAsignadaDocente;
  asistencias: any[]=[];
  filteredAsistencias: any[] = []; // Lista de asistencias filtradas

  displayedColumns: string[]=[] ;
  cambiosAsistencias: any[]=[];
  private readonly currentYear = new Date().getFullYear();
  readonly minDate = new Date(this.currentYear - 20, 0, 1);
  readonly maxDate = new Date(this.currentYear + 1, 11, 31);
  route:ActivatedRoute=inject(ActivatedRoute)
  idMateria!:number;
  constructor( private mensajeService:MensajeService) {
    this.idMateria=this.route.snapshot.params['idMateria']
  }

  ngOnInit(): void {
    this.servicioAsistencias.getAsistenciasDeMateriaAsignada(this.idMateria).subscribe(
      (response: MateriaAsignadaDocente) => {
        console.log('Datos recibidos:', response);
        this.materiaAsignada = response;
        console.log("respini",this.materiaAsignada)

        this.asistencias= (
          this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.asistencias, "Asistencia").length === 0
          ? this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.inscripciones, "Inscripción")
          : this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.asistencias, "Asistencia")
        );
        this.filteredAsistencias = this.asistencias; // Inicializar filteredAsistencias con la lista completa

        let fechas:string[]= [...this.servicioAsistencias.getUniqueFechas()];
        if (fechas.includes("Invalid Date")) {
          this.displayedColumns= ['nombre']
          return
        }
        this.displayedColumns= ['nombre', ...this.servicioAsistencias.getUniqueFechas()]
        console.log("ini",this.asistencias)
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )
  }


  getEstadoAsistencia(asistencias: Asistencia[], fecha: string): string {

    return this.servicioAsistencias.getEstadoAsistencia(asistencias, fecha);

  }


  agregarFecha(event: MatDatepickerInputEvent<Date>) {
    const fechaSeleccionada: Date | null = event.value;
    let fechaActual=fechaSeleccionada|| new Date();
    this.displayedColumns.push(fechaActual.toLocaleDateString());
    let asistencias:Asistencia[]=[]
    for(let registro of this.asistencias){
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
      asistencias.push(data)
    }
    this.servicioAsistencias.guardarAsistencias(asistencias).subscribe(
      (response: Asistencia[]) => {
        this.materiaAsignada.asistencias = this.materiaAsignada.asistencias || [];
        this.materiaAsignada.asistencias=this.materiaAsignada.asistencias.concat(response);
        console.log(this.materiaAsignada.asistencias)
        console.log(response)
        this.materiaAsignada.asistencias=[...response,...this.materiaAsignada.asistencias]
        this.asistencias =this.servicioAsistencias.getAsistenciasAgrupadasPorEstudiante(this.materiaAsignada.asistencias, "Asistencia") ;
        this.filteredAsistencias=this.asistencias;
      },
      error => {
        console.error('Error en la petición POST:', error);
      }
    )

  }



  actualizarAsistencia(asistencias: Asistencia[], fecha: string, event: any) {
    console.log("gg", this.cambiosAsistencias);
    console.log("gg", asistencias);

    
    let asistencia = asistencias.find(
      (a) => new Date(a.fecha_asistencia).toISOString().slice(0, 10) === fecha
    );

    if (asistencia) {
      asistencia.estado = event.value;
      this.cambiosAsistencias.push({
        id_asistencia: asistencia.id_asistencia,
        estado: asistencia.estado,
      });
    } else {
      console.log("No se encontró la asistencia para la fecha especificada.");
    }

    return event.value;
  }


  guardarCambios(){
    console.log("guardar",this.cambiosAsistencias)
    this.mensajeService.mostrarMensajeExito("¡Éxito","La fecha se ha guardado exitosamente")
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
    Swal.fire({
      title: 'Editar Fecha',
      input: 'date',
      inputLabel: `Fecha actual: ${fecha}`,
      inputValue: fecha,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, selecciona una fecha válida.';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const nuevaFecha = result.value;

        // Actualizar displayedColumns con la nueva fecha si existe
        const index = this.displayedColumns.indexOf(fecha);
        if (index !== -1) {
          this.displayedColumns[index] = nuevaFecha;
        }

        console.log("Asistencias antes de la actualización:", this.asistencias);

        // Actualizar cada registro en asistencias con la nueva fecha
        for (let registro of this.asistencias) {
          const asistencia = registro.asistencias.find(
            (a: any) => new Date(a.fecha_asistencia + "T00:00:00").toLocaleDateString() === fecha ||
                        new Date(a.fecha_asistencia).toLocaleDateString() === fecha
          );

          if (asistencia) {
            asistencia.fecha_asistencia = new Date(nuevaFecha).toLocaleDateString('en-EN');
          }
        }

        console.log("Asistencias después de la actualización:", this.asistencias);
      }
    });
  }


  eliminarFecha(fecha: string) {
    //const confirmacion = confirm(`¿Estás seguro de eliminar la fecha ${fecha}?`);
    this.mensajeService.mostrarMensajeConfirmacion(
      '¡Confirmación!',
      `¿Estás seguro de eliminar la fecha ${fecha}?`,
      ()=>{
       // if (confirmacion) {
          const index = this.displayedColumns.indexOf(fecha);
          if (index !== -1) {
            this.displayedColumns.splice(index, 1);
          }

          for (let registro of this.asistencias) {
            const asistenciaIndex = registro.asistencias.findIndex((a: Asistencia) =>
              new Date(a.fecha_asistencia).toLocaleDateString() === new Date(fecha).toLocaleDateString()
            );
            if (asistenciaIndex !== -1) {
              registro.asistencias.splice(asistenciaIndex, 1);
            }
          }
        }

     // }


    )

  }


  // Añade la función de filtrado
  filtrarEstudiantes(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAsistencias = this.asistencias.filter((asistencia) =>
      asistencia.nombre.toLowerCase().includes(input)
    );
  }

  // Actualiza el dataSource en la tabla para usar asistenciasFiltradas
  get dataSource() {
    return this.filteredAsistencias;
  }
}
