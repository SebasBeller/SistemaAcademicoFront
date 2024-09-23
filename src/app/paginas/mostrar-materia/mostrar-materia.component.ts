import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mostrar-materia',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './mostrar-materia.component.html',
  styleUrls: ['./mostrar-materia.component.sass'] // Corregido a styleUrls
})
export class MostrarMateriaComponent {

  // Definir un arreglo de materias
  materias = [
    {
      titulo: 'Matemáticas',
      imagen: 'assets/img/Recurso (1).png',
      profesor: 'Juan Perez',
      paralelo: '1er A'
    },
    {
      titulo: 'Física',
      imagen: 'assets/img/Recurso (4).png',
      profesor: 'Ana Gomez',
      paralelo: '1er B'
    },
    {
      titulo: 'Química',
      imagen: 'assets/img/Recurso (3).png',
      profesor: 'Carlos Ruiz',
      paralelo: '2do C'
    }
  ];

}
