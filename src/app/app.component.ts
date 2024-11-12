import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectionColorService } from './servicios/selection-color.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sistema-estudiantil-ia';

  selectedColor: string = 'azul';

  constructor(private colorService: SelectionColorService) {}

  onColorChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedColor = selectElement.value;
    this.colorService.changeColor(this.selectedColor);
    console.log('Color seleccionado:', this.selectedColor);
  }
}
