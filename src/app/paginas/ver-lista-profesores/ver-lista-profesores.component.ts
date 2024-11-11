import { Component, OnInit } from '@angular/core';
import { HistorialAsistenciaService } from '../../servicios/historial-asistencia.service';
import { Profesor } from '../../interfaces/profesor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-ver-lista-profesores',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ver-lista-profesores.component.html',
  styleUrl: './ver-lista-profesores.component.sass'
})
export class VerListaProfesoresComponent implements OnInit {
  profesores: Profesor[] = [];
  profesoresFiltrados: Profesor[] = [];
  terminoBusqueda: string = '';

  constructor(private historialAsistenciaService: HistorialAsistenciaService) {}

  ngOnInit(): void {
    this.historialAsistenciaService.obtenerProfesores().subscribe((data: Profesor[]) => {
      this.profesores = data;
      this.profesoresFiltrados = data;
      console.log('Inscripciones:', this.profesores);
    });

  }

  filtrarProfesores(): void {
    const termino = this.terminoBusqueda.toLowerCase(); 
    this.profesoresFiltrados = this.profesores.filter(profesor =>
      profesor.nombre.toLowerCase().includes(termino) ||
      profesor.apellido.toLowerCase().includes(termino) 
    );
  }
  
}
