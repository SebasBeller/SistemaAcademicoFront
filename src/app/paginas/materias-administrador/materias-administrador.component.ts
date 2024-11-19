import { Component } from '@angular/core';
import {MateriaService} from '../../servicios/materia.service';
import {Materia} from '../../interfaces/materia';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MensajeService } from '../mensaje/mensaje.component';
import {FormularioAgregarMateriaComponent} from '../formulario-agregar-materia/formulario-agregar-materia.component';
import {ParaleloService} from '../../servicios/paralelo.service';
import {Paralelo} from '../../interfaces/paralelo'
import{FormularioAsignarMateriaDocenteComponent} from '../formulario-asignar-materia-docente/formulario-asignar-materia-docente.component';
import type { Profesor } from '../../interfaces/profesor';
import {ProfesorService} from '../../servicios/profesor.service'
import {MateriasProfesorService} from '../../servicios/materias-profesor.service'
import {MateriaAsignadaDocente} from '../../interfaces/materia-asignada-docente'
import { SelectionColorService } from '../../servicios/selection-color.service';
@Component({
  selector: 'app-materias-administrador',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './materias-administrador.component.html',
  styleUrl: './materias-administrador.component.sass'
})
export class MateriasAdministradorComponent {
  selectedColor: string = '';
  materias:Materia[]=[];
  paralelos:Paralelo[]=[];
  searchTerm: string = '';
  profesores:Profesor[]=[];

  constructor(
    private colorService: SelectionColorService,
    private servicioMaterias:MateriaService,
    private dialog: MatDialog,
    private mensajeService: MensajeService,
    private paraleloService:ParaleloService,
    private profesorService:ProfesorService,
    private materiasProfesorService:MateriasProfesorService

  ){
    servicioMaterias.getMaterias().subscribe(
      response=>{
        this.materias=response;
        let materiasProfesores:any=[];
        this.materiasProfesorService.obtenerMaterias().subscribe(
          response=>{
            materiasProfesores=response;
            this.materias.forEach(materia=>{
              let materiaAsignada=materiasProfesores.find((materiaProfesor:any)=>materiaProfesor.materia.id_materia=== materia.id_materia);
              materia.profesorAsignado=materiaAsignada?.profesor;
              materia.id=materiaAsignada?.id_dicta
            })

            console.log("resp",response)
          },
          error=>{
            console.log(error)
          }
        )

        console.log(response)
      },
      error=>{
        console.log(error)
      }
    )
    paraleloService.getParalelo().subscribe(
      response=>{
        this.paralelos=response;
        console.log("resp",response)
      },
      error=>{
        console.log(error)
      }
    )
    profesorService.getProfesores().subscribe(
      response=>{
        this.profesores=response;
        console.log("resp",response)
      },
      error=>{
        console.log(error)
      }
    )

  }

  addNewMateria() {
    const dialogRef = this.dialog.open(FormularioAgregarMateriaComponent, {
      width: '300px',
      data: 
      { name: '', paralelos: this.paralelos }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        let materia:Materia={
          id:0,
          id_materia:0,
          nombre:result.name,
          paralelo:result.paralelo,
          area:"ciencias",
          id_paralelo:result.paralelo.id_paralelo,
          profesorAsignado:undefined
        }
        this.servicioMaterias.postMateria(materia).subscribe(
          response=>{
            console.log("resp",response)
            materia.id_materia=response.id_materia
            materia.id=response.id_materia
            this.materias.push(materia)
          },
          error=>{
            console.log(error)
          }
        )
      }
    });

  }

  ngOnInit() {
    this.colorService.currentColor$.subscribe(color => {
      this.selectedColor = color; // Actualiza el color recibido
      console.log('Color recibido en Login:', this.selectedColor);
    });
  }

  getColorClass(): string {
    switch (this.selectedColor) {
      case 'verde':
        return 'color-verde';
      case 'amarillo':
        return 'color-amarillo';
      default:
        return 'color-azul';
    }
  }

  asignarProfesor(materiaSeleccionada:Materia) {
    console.log(materiaSeleccionada);
    const dialogRef = this.dialog.open(FormularioAsignarMateriaDocenteComponent, {
      width: '300px',
      data: 
      { fecha: new Date().toISOString(), profesores:this.profesores}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let materiaAsignada:any={
          id_dicta:0,
          materia:materiaSeleccionada,
          profesor:result.profesor,
          fecha:result.fecha.split("T")[0]

        }
        console.log(materiaAsignada);
        this.materiasProfesorService.agregarMateriaAsignada(materiaAsignada).subscribe(
          response=>{
            console.log("resp",response)
            let indice=this.materias.findIndex(materia=>materia.id_materia===response.materia?.id_materia)
            this.materias[indice].profesorAsignado=response.profesor;
            this.materias[indice].id=response.id_dicta;

          },
          error=>{
            console.log(error)
          }
        )

      }
    });

  }

  asignarEstudiante(id_dicta:number){
    console.log(id_dicta);
  }
  
  get filteredMaterias(): Materia[] {
    return this.materias.filter(materia =>
      materia.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }





}
