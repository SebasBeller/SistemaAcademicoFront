import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private trimestreData = {
    primerTrimestre: [
      { id: 1, nombre: 'Números Enteros' },
      { id: 2, nombre: 'Geometría' },
      { id: 3, nombre: 'Números Racionales' }
    ]
  };

  constructor() { }

  getTrimestreData() {
    return this.trimestreData.primerTrimestre;
  }
}
