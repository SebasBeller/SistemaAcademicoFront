import { Injectable } from '@angular/core';
import { Materia } from '../interfaces/materia';
@Injectable({
  providedIn: 'root'
})
export class MateriasProfesorService {

  constructor() { }
  materias: Materia[] = [
    { id: 1, nombre: 'Matemáticas', area: 'Ciencias Exactas', paralelo: '1A' },
    { id: 2, nombre: 'Física', area: 'Ciencias Exactas', paralelo: '1B' },
    { id: 3, nombre: 'Química', area: 'Ciencias Naturales', paralelo: '2A' },
    { id: 4, nombre: 'Biología', area: 'Ciencias Naturales', paralelo: '2B' },
    { id: 5, nombre: 'Historia', area: 'Ciencias Sociales', paralelo: '3A' },
    { id: 6, nombre: 'Geografía', area: 'Ciencias Sociales', paralelo: '3B' },
    { id: 7, nombre: 'Lengua Española', area: 'Lenguaje', paralelo: '4A' },
    { id: 8, nombre: 'Inglés', area: 'Lenguaje', paralelo: '4B' },
    { id: 9, nombre: 'Filosofía', area: 'Humanidades', paralelo: '5A' },
    { id: 10, nombre: 'Educación Física', paralelo: '5B' },
    { id: 11, nombre: 'Música', area: 'Arte', paralelo: '6A' },
    { id: 12, nombre: 'Arte', area: 'Arte', paralelo: '6B' },
];

  getMaterias(): Materia[] {  
    return this.materias;
  }
  
}
