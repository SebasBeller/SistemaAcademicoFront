import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionColorService {

  private colorSubject = new BehaviorSubject<string>('azul'); 
  currentColor$ = this.colorSubject.asObservable(); 

  changeColor(color: string) {
    this.colorSubject.next(color);
  }
}
