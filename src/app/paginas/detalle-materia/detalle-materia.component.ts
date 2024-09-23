import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-materia',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './detalle-materia.component.html',
  styleUrls: ['./detalle-materia.component.sass']
})
export class DetalleMateriaComponent implements OnInit {

  materiaTitulo: string = '';
  area: string = '';
  profesor: string = '';
  paralelo: string = '';
  contenido: string = '';
  imagen: string = '';
  temas: { nombre: string, imagen: string, descripcion: string }[] = []; // Array para los temas

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.materiaTitulo = params['titulo'];
      this.loadMateriaDetails();
    });
  }

  loadMateriaDetails(): void {
    if (this.materiaTitulo === 'Matemáticas') {
      this.area = 'Ciencias Exactas';
      this.profesor = 'Juan Perez';
      this.paralelo = '1er A';
      this.imagen = 'assets/img/Recurso (1).png';
      this.temas = [
        { nombre: 'Números Enteros', imagen: 'assets/img/Recurso (1).png', descripcion: 'Descripción de Números Enteros' },
        { nombre: 'Fracciones', imagen: 'assets/img/Recurso (4).png', descripcion: 'Descripción de Fracciones' },
        { nombre: 'Decimales', imagen: 'assets/img/Recurso (5).png', descripcion: 'Descripción de Decimales' }
      ]; // Agrega los temas aquí
    }
  }
}
