import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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
import { Material } from "../../../../interfaces/material";
import { MaterialService } from "../../../../servicios/material.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit, OnDestroy {
  progress = '0%';
  downloadURL: string | undefined;
  file!: File;
  private readonly _storage = inject(Storage);
  subscription: Subscription | undefined;

  // Variables para el tipo de material y el título
  tipoMaterial: string = 'Teorico'; // Valor predeterminado
  nombreMaterial: string = '';
  currentMaterialId: number | null = null;

  showForm: boolean = false;
  materiales: Material[] = [];

  servicioMateriales: MaterialService = inject(MaterialService);

  id_unidad?: number;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.id_unidad = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.servicioMateriales.getMaterialesDeUnidad(this.id_unidad).subscribe(
      response => {
        console.log('Datos recibidos:', response);
        this.materiales = response;
      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    );
  }

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      if (this.file.type !== 'application/pdf') {
        console.error("ERROR FORMATO NO VALIDO DEBE SUBIR SOLO PDF");
        return;
      }
      this.uploadFile();
    }
  }

  uploadFile() {
    const storageRef = ref(this._storage, `uploads/${this.file.name}`);
    const task = uploadBytesResumable(storageRef, this.file);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = percentage(task).subscribe(
      async ({ progress }) => {
        this.progress = `${progress}%`;
        if (progress === 100) {
          this.downloadURL = await getDownloadURL(storageRef);
          console.log('Download URL:', this.downloadURL);
        }
      }
    );
  }

  confirm() {
    const newMaterial: Material = {
        id_material: this.currentMaterialId !== null ? this.currentMaterialId : this.materiales.length + 1,
        tipo: this.tipoMaterial,
        nombre: this.nombreMaterial,
        url: this.downloadURL,
        id_unidad: this.id_unidad,
    };

    if (this.currentMaterialId !== null) {
        this.servicioMateriales.actualizarMaterial(this.currentMaterialId, newMaterial).subscribe(
            response => {
                const index = this.materiales.findIndex(mat => mat.id_material === this.currentMaterialId);
                if (index !== -1) {
                    this.materiales[index] = response;
                }
                this.resetForm(); 
            },
            error => {
                console.error('Error al actualizar el material:', error);
            }
        );
    } else {
        this.servicioMateriales.guardadMaterial(newMaterial).subscribe(
            idMaterial => {
                console.log('Material guardado con ID:', idMaterial);
                this.servicioMateriales.encontrarMaterial(idMaterial).subscribe(
                    (material: Material) => {
                        this.materiales.push(material); 
                        this.resetForm(); 
                    }
                );
            },
            error => {
                console.error('Error al guardar el material:', error);
            }
        );
    }

    this.showForm = false; 
    this.downloadURL = ''; 
}


  cancel() {
    this.resetForm();
    this.showForm = false;
  }

  toggleForm(material?: Material) {
    this.showForm = !this.showForm;

    if (material) {
      this.currentMaterialId = material.id_material || null;
      this.tipoMaterial = material.tipo; // Pre-cargar tipo
      this.nombreMaterial = material.nombre; // Pre-cargar nombre
      this.downloadURL = material.url; // Pre-cargar URL
    } else {
      this.resetForm(); // Reiniciar el formulario si no hay material
    }
  }

  goToMaterial(material: Material) {
    window.open('/api' + material.url, '_blank');
  }

  resetForm() {
    this.nombreMaterial = '';
    this.tipoMaterial = 'Teorico';
    this.downloadURL = undefined;
    this.progress = '0%';
    this.currentMaterialId = null; // Reset ID material
  }

  eliminarMaterial(id: number | undefined) {
    if (id !== undefined) {
      this.servicioMateriales.eliminarMaterial(id).subscribe(
        () => {
          this.materiales = this.materiales.filter(material => material.id_material !== id);
          console.log('Material eliminado');
        },
        error => {
          console.error('Error al eliminar el material:', error);
        }
      );
    } else {
      console.error('ID de material es undefined');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
