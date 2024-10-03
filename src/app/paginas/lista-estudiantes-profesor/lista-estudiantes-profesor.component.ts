import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-estudiantes-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-estudiantes-profesor.component.html',
  styleUrl: './lista-estudiantes-profesor.component.sass'
})
export class ListaEstudiantesProfesorComponent implements OnInit {
  estudiantes: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.estudiantes = this.dataService.getListstudentsData();
  }
}
