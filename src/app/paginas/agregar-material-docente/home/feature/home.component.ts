import { Component, computed, inject, signal ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../agregar-material-docente/shared/ui/navbar/navbar.component';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  percentage,
} from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {Material} from "../../../../interfaces/material"
import {MaterialService} from "../../../../servicios/material.service"
import { ActivatedRoute} from '@angular/router';
import {MensajeService} from '../../../mensaje/mensaje.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit{
  progress = signal('0%');
  downloadURL: string | undefined = undefined;
  file!: File;
  private readonly _storage = inject(Storage);
  susbscription: Subscription | undefined = undefined;

  // Variables para el tipo de material y el título
  tipoMaterial: string = 'Teorico'; // Valor predeterminado
  nombreMaterial: string = '';

  showForm: boolean = false;
  materiales: Material[] = [];

  servicioMateriales:MaterialService = inject(MaterialService);

  id_unidad?:number;
  route:ActivatedRoute=inject(ActivatedRoute) ;
  mensajeService:MensajeService=inject(MensajeService); 

  constructor(storage: Storage) {
    this._storage = storage;
    this.id_unidad=this.route.snapshot.params['id']
  }
  ngOnInit(): void {
    this.servicioMateriales.getMaterialesDeUnidad(this.id_unidad).subscribe(
      response => {
        console.log('Datos recibidos:', response);
        this.materiales = response; 
        console.log('Materia:', this.materiales);
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )
      
  }

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      if(!this.file.type.split("/")[1].includes("pdf")){
        this.mensajeService.mostrarMensajeError("ERROR!!","Error Formato Invalido, solo se debe subir PDFs");
        return;
      }
      this.uploadFile();
    }
  }

  uploadFile() {
    const storageRef = ref(this._storage, `uploads/${this.file.name}`);
    const task = uploadBytesResumable(storageRef, this.file);

    if (this.susbscription) {
      this.susbscription.unsubscribe();
      this.susbscription = undefined;
    }

    this.susbscription = percentage(task).subscribe(
      async ({ progress }: { progress: number }) => {
        this.progress.set(`${progress}%`);
        if (progress === 100) {
          this.downloadURL = await getDownloadURL(storageRef);
          console.log('Download URL:', this.downloadURL);
        }
      }
    );
  }

  // Confirmar la adición de un nuevo material
  confirm() {
    let material: Material = {
      nombre: this.nombreMaterial,
      tipo: this.tipoMaterial,
      url: this.downloadURL,
    }
    if (this.nombreMaterial && this.tipoMaterial && this.downloadURL) {
      material.id_unidad=this.id_unidad
      this.servicioMateriales.guardadMaterial(material).subscribe(
        response => {
          this.mensajeService.mostrarMensajeExito("SUBIDA DE ARCHIVO EXITOSA!!","Se subio el archivo correctamente");
          console.log('Material guardado:', response);
          this.materiales.push(material);
          this.resetForm();
        }
      );
    }
  }
  cancel() {
    // Aquí puedes manejar la lógica para cancelar la acción
    //this.nombreMaterial = '';
    //this.tipoMaterial = 'Teorico';
    //this.progress.set('0%');
    this.resetForm();
    this.showForm = false;
    //this.downloadURL = null;
  }

    // Mostrar/ocultar el formulario
    toggleForm() {
      this.showForm = !this.showForm;
    }

      // Redirigir al archivo del material
  goToMaterial(material: Material) {
    window.open('/api'+material.url, '_blank');
  }

    // Restablecer los valores del formulario
    resetForm() {
      this.nombreMaterial = '';
      this.tipoMaterial = 'Teorico';
      this.downloadURL = undefined;
      this.progress.set('0%');
  }

  ngOnDestroy() {
    if (this.susbscription) {
      this.susbscription.unsubscribe();
    }
  }
}
