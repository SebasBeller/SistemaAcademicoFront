import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscar-materia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscar-materia.component.html',
  styleUrl: './buscar-materia.component.sass'
})
export class BuscarMateriaComponent {
  materias = [
    { nombre: 'Matemáticas', id: 1 },
    { nombre: 'Historia', id: 2 },
    { nombre: 'Ciencias', id: 3 }
  ];

  resultado: string | null = null;
  busquedaRealizada = false;

  buscar(){
    const inputValue = (document.getElementById('buscar-materia') as HTMLInputElement).value;
    const filtro = (document.getElementById('filtro-categoria') as HTMLSelectElement).value;

    console.log('Buscando:', inputValue, 'en la categoría:', filtro);

    if (filtro === 'materia') {
      const materia = this.materias.find(m => m.nombre.toLowerCase() === inputValue.toLowerCase());
      this.resultado = materia ? `Materia encontrada: ${materia.nombre}` : null;
      
    }
    else {
      this.resultado = null;
    }

    this.busquedaRealizada = true;
  }

}
