import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselService } from '../../servicios/carrusel.service';
import { Anuncio } from '../../interfaces/carrusel';

@Component({
  selector: 'app-inicio-carrucel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-carrucel.component.html',
  styleUrl: './inicio-carrucel.component.sass'
})
export class InicioCarrucelComponent {
  anuncios: Anuncio[] = []; // Ahora es un arreglo de objetos Anuncio
  currentIndex = 0;

  constructor(private anuncioService: CarruselService) {
    setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }

  ngOnInit(): void {
    this.obtenerAnuncios(); // Cargar los anuncios cuando el componente se inicializa
  }

  obtenerAnuncios(): void {
    this.anuncioService.getImages().subscribe((data: Anuncio[]) => {
      this.anuncios = data; // Asignamos los anuncios a la propiedad 'anuncios'
    });
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.anuncios.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.anuncios.length) % this.anuncios.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}