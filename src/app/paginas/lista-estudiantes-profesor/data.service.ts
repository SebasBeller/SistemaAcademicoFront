import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private liststudents = {
    materiaMatmaticas: [
      { id: 1, nombres: 'Lucas', apellidos: 'Fernandez Ticona', edad: '11' },
      { id: 2, nombres: 'Analusia', apellidos: 'Gutierres Flores', edad: '11'},
      { id: 3, nombres: 'Ronald', apellidos: 'Raldes Salinas', edad: '11'}
    ]
  };

  constructor() { }

  getListstudentsData() {
    return this.liststudents.materiaMatmaticas;
  }
}
