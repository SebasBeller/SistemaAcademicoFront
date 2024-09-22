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

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
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

  confirm() {
    // Aquí puedes manejar la lógica para confirmar la creación del material
    console.log('Tipo de Material:', this.tipoMaterial);
    console.log('Título del Material:', this.tituloMaterial);
    console.log('URL del archivo:', this.downloadURL);
  }

  cancel() {
    // Aquí puedes manejar la lógica para cancelar la acción
    this.tituloMaterial = '';
    this.tipoMaterial = 'Teorico';
    this.progress.set('0%');
    this.downloadURL = null;
  }

  ngOnDestroy() {
    if (this.susbscription) {
      this.susbscription.unsubscribe();
    }
  }
}
