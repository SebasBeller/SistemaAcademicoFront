import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-nuevo-contenido',
  standalone: true,
  templateUrl: './agregar-nuevo-contenido.component.html',
  styleUrls: ['./agregar-nuevo-contenido.component.sass'],
  imports: [CommonModule, FormsModule]
})
export class AgregarNuevoContenidoComponent {
  showForm = false;
  newModuleName = '';
  newModuleImageUrl = '';
  cardCounter = 1;
  cards: { id: number; content: string; imageUrl: string }[] = [];

  addNewModule() {
    this.cards.push({
      id: this.cardCounter,
      content: this.newModuleName || `Nuevo Contenido ${this.cardCounter}`,
      imageUrl: this.newModuleImageUrl || 'default-image-url.jpg'
    });
    this.cardCounter++;
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  resetForm() {
    this.newModuleName = '';
    this.newModuleImageUrl = '';
    this.showForm = false;
  }

  editCard(id: number) {
    alert(`Editando contenido con ID: ${id}`);
  }

  deleteCard(id: number) {
    this.cards = this.cards.filter(card => card.id !== id);
    if (this.cards.length === 0) {
      this.cardCounter = 1;
    }
  }
}
