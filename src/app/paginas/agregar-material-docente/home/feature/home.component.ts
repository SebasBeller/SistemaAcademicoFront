import { Component, computed, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  progress = signal('0%');
  downloadURL: string | null = null;
  file!: File;
  private readonly _storage = inject(Storage);
  susbscription: Subscription | undefined = undefined;

  // Variables para el tipo de material y el título
  tipoMaterial: string = 'Teorico'; // Valor predeterminado
  tituloMaterial: string = '';

  showForm: boolean = false;
  materiales: Array<{ titulo: string ;tipo:string; url: string }> = [];

  constructor(storage: Storage) {
    this._storage = storage;
  }

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
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
    if (this.tituloMaterial && this.tipoMaterial && this.downloadURL) {
      this.materiales.push({
        titulo: this.tituloMaterial,
        tipo: this.tipoMaterial,
        url: this.downloadURL,
      });
      this.resetForm();
    }
  }
  cancel() {
    // Aquí puedes manejar la lógica para cancelar la acción
    //this.tituloMaterial = '';
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
  goToMaterial(material: { titulo: string; tipo: string; url: string }) {
    window.open(material.url, '_blank');
  }

    // Restablecer los valores del formulario
    resetForm() {
      this.tituloMaterial = '';
      this.tipoMaterial = 'Teorico';
      this.downloadURL = null;
      this.progress.set('0%');
  }

  ngOnDestroy() {
    if (this.susbscription) {
      this.susbscription.unsubscribe();
    }
  }
}
