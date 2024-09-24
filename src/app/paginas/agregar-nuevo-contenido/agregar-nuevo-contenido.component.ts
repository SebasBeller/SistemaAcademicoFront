// agregar-nuevo-contenido.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioAgregarContenidoComponent } from '../formulario-agregar-contenido/formulario-agregar-contenido.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Importa FormsModule correctamente desde @angular/forms

@Component({
  selector: 'app-agregar-nuevo-contenido',
  standalone: true,
  templateUrl: './agregar-nuevo-contenido.component.html',
  styleUrls: ['./agregar-nuevo-contenido.component.sass'],
  imports: [CommonModule, MatButtonModule, FormsModule] // Asegúrate de que FormsModule esté en la lista de imports
})
export class AgregarNuevoContenidoComponent {
  cardCounter = 1;
  cards: { id: number; content: string; imageUrl: string }[] = [];
  showForm = false;
  newModuleName = '';
  newModuleImageUrl = '';

  constructor(private dialog: MatDialog) {}

  addNewModule() {
    const dialogRef = this.dialog.open(FormularioAgregarContenidoComponent, {
      width: '300px',
      data: { name: '', imageUrl: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cards.push({
          id: this.cardCounter,
          content: result.name || `Nuevo Contenido ${this.cardCounter}`,
          imageUrl: result.imageUrl || 'default-image-url.jpg'
        });
        this.cardCounter++;
        this.resetForm();
      }
    });
  }

  editCard(id: number) {
    const cardToEdit = this.cards.find(card => card.id === id);
    if (!cardToEdit) return;

    const dialogRef = this.dialog.open(FormularioAgregarContenidoComponent, {
      width: '300px',
      data: {
        name: cardToEdit.content,
        imageUrl: cardToEdit.imageUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.cards.findIndex(card => card.id === id);
        if (index !== -1) {
          this.cards[index] = {
            id,
            content: result.name,
            imageUrl: result.imageUrl
          };
        }
      }
    });
  }

  deleteCard(id: number) {
    this.cards = this.cards.filter(card => card.id !== id);
    if (this.cards.length === 0) {
      this.cardCounter = 1;
    }
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
