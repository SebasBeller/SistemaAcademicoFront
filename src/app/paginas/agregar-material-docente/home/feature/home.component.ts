import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

import {
    Storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    percentage,} from '@angular/fire/storage';
import { Subscription } from 'rxjs';

@Component({
selector: 'app-home',
standalone: true,
imports: [CommonModule], // Asegúrate de importar CommonModule aquí
templateUrl:'./home.component.html',
})
export default class HomeComponent {
    progress = signal('0%');

    downloadURL: string | null = null;
    // almacena la URL

    file!: File;
    // manejara el storage , de angular
    private readonly _storage = inject(Storage);

    susbscription: Subscription | undefined = undefined;

    changeInput(event: Event) {
    console.log(this._storage);
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

        this.susbscription = percentage(task).subscribe(async ({ progress }: { progress: number }) => {
            // Convertir el progreso a string y actualizar la señal
            this.progress.set(`${progress}%`);

            // Si la carga está completa (100%), obtener la URL del archivo
            if (progress === 100) {
                this.downloadURL = await getDownloadURL(storageRef);
                console.log('Download URL:', this.downloadURL); // Verificar si se obtiene la URL

            }
        });


    
        
    }
}

