import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';  
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [CommonModule] 
})
export class AppComponent implements OnInit {
  materias: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.log('AppComponent inicializado');
    this.materias = this.dataService.getTrimestreData();
  }
}


