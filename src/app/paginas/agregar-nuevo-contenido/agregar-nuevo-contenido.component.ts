// agregar-nuevo-contenido.component.ts
import { Component ,inject,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioAgregarContenidoComponent } from '../formulario-agregar-contenido/formulario-agregar-contenido.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Importa FormsModule correctamente desde @angular/forms
import { ActivatedRoute } from '@angular/router';
import {Unidad} from '../../interfaces/unidad';
import {UnidadService} from '../../servicios/unidad.service';
import {MateriasProfesorService} from '../../servicios/materias-profesor.service';
import {MateriaAsignadaDocente} from '../../interfaces/materia-asignada-docente';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MensajeService } from '../mensaje/mensaje.component';


@Component({
  selector: 'app-agregar-nuevo-contenido',
  standalone: true,
  templateUrl: './agregar-nuevo-contenido.component.html',
  styleUrls: ['./agregar-nuevo-contenido.component.sass'],

  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    RouterLink,


  ] // Asegúrate de que FormsModule esté en la lista de imports
})
export class AgregarNuevoContenidoComponent  implements OnInit {
  cardCounter = 1;
  unidades: Unidad[] = [];
  showForm = false;
  newModuleName = '';
  newModuleImageUrl = '';
  materiaAsiganda?:MateriaAsignadaDocente;
  messages: any[] = [];
  id_dicta:number;
  unidadServicio:UnidadService = inject(UnidadService)
  materiaAsignadaServicio:MateriasProfesorService = inject(MateriasProfesorService)

  route:ActivatedRoute=inject(ActivatedRoute)
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private mensajeService: MensajeService

  ) {
    this.id_dicta=this.route.snapshot.params['id_dicta']
  }


  ngOnInit(): void {
    this.materiaAsignadaServicio.obtenerMateriaAsignada(this.id_dicta).subscribe(
      response => {
        console.log('Datos recibidos:', response);
        this.materiaAsiganda = response;
        console.log('Materia:', this.materiaAsiganda);
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )

    this.unidadServicio.getUnidadesDeMateriAsignada(this.id_dicta).subscribe(
      response => {
        console.log('Datos recibidos:', response);
        this.unidades = response;
        console.log('Unidades:', this.unidades);
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    );


  }

  addNewModule() {
    const dialogRef = this.dialog.open(FormularioAgregarContenidoComponent, {
      width: '300px',
      data: { name: '', imageUrl: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let nuevaUnidad:Unidad=
        {
          id_dicta: this.id_dicta,
          nombre: result.name || `Nuevo Contenido ${this.cardCounter}`,
          trimestre: '1er',
          imagen_url: result.imageUrl || 'default-image-url.jpg',
          descripcion: undefined,
          imagen: undefined
        }
        this.mensajeService.mostrarMensajeExito("¡Éxito", 'Se ha agregado con éxito un nuevo contenido');
        console.log(nuevaUnidad)
        this.unidadServicio.guardarUnidadDeMateriAsignada(nuevaUnidad).subscribe(
          response => {
            console.log('Respuesta:', response);
            nuevaUnidad.id_unidad=response
            this.unidades.push(nuevaUnidad);
            this.cardCounter++;
            this.resetForm();


          },
          error => {
            console.error('Error:', error);

           this.mensajeService.mostrarMensajeError('¡Error!','Algo a pasado')
          }
        )

      }
    });

  }

  editCard(id?: number) {
    // const cardToEdit = this.cards.find(card => card.id === id);
    // if (!cardToEdit) return;

    // const dialogRef = this.dialog.open(FormularioAgregarContenidoComponent, {
    //   width: '300px',
    //   data: {
    //     name: cardToEdit.content,
    //     imageUrl: cardToEdit.imageUrl
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     const index = this.cards.findIndex(card => card.id === id);
    //     if (index !== -1) {
    //       this.cards[index] = {
    //         id,
    //         content: result.name,
    //         imageUrl: result.imageUrl
    //       };
    //     }
    //   }
    // });
  }

  deleteCard(id?: number) {
    // this.cards = this.cards.filter(card => card.id !== id);
    // if (this.cards.length === 0) {
    //   this.cardCounter = 1;
    // }
  }
  dirigirAContenido(id?:number){
    this.router.navigate( ['/home/agregar-material-docente', id])
  }
  cancel() {
    this.showForm = false;
    this.resetForm();
  }





  private resetForm() {
    this.newModuleName = '';
    this.newModuleImageUrl = '';
  }
}
