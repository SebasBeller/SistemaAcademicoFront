import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-agregar-nuevo-contenido',
  standalone: true,
  templateUrl: './agregar-nuevo-contenido.component.html',
  styleUrl: './agregar-nuevo-contenido.component.sass',
  imports: [CommonModule]
})
export class AgregarNuevoContenidoComponent {
  cardCounter = 1;
  cards: { id: number; content: string }[] = [];

  addCard() {
    this.cards.push({
      id: this.cardCounter,
      content: `Nuevo Contenido ${this.cardCounter}`
    });
    this.cardCounter++;
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