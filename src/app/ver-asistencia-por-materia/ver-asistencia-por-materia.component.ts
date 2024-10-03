import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar ngClass
// La interfaz 'Day' debe estar fuera de la clase
interface Day {
  day: number;
  status: 'present' | 'absent' | 'none';
}
@Component({
  selector: 'app-ver-asistencia-por-materia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-asistencia-por-materia.component.html',
  styleUrl: './ver-asistencia-por-materia.component.sass'
})
export class VerAsistenciaPorMateriaComponent {
  professor = 'Juan Perez';
  parallel = '1°A';
  month = 'Septiembre';

  // Ahora 'days' es un array del tipo 'Day'
  days: Day[] = [
    { day: 1, status: 'present' }, { day: 3, status: 'absent' }, { day: 5, status: 'present' },
    { day: 8, status: 'present' }, { day: 10, status: 'present' }, { day: 12, status: 'present' },
    { day: 14, status: 'absent' }, { day: 17, status: 'absent' }, { day: 19, status: 'present' },
    { day: 21, status: 'present' }, { day: 24, status: 'present' }, { day: 26, status: 'present' },
    { day: 28, status: 'present' },
  ];

  // Método para obtener la clase de CSS según el estado
  getStatusClass(status: string) {
    return {
      'present': status === 'present',
      'absent': status === 'absent',
      'none': status === 'none',
    };
  }

  // Actualizamos el tipo del parámetro 'day'
  toggleStatus(day: Day) {
    if (day.status === 'present') {
      day.status = 'absent';
    } else if (day.status === 'absent') {
      day.status = 'none';
    } else {
      day.status = 'present';
    }
  }
}
