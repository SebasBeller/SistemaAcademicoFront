import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Day {
  day: number;
  status: 'present' | 'absent' | 'none';
}

@Component({
  selector: 'app-ver-asistencia-por-materia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-asistencia-por-materia.component.html',
  styleUrls: ['./ver-asistencia-por-materia.component.sass']
})
export class VerAsistenciaPorMateriaComponent {
  professor = 'Juan Perez';
  parallel = '1°A';
  month = 'Septiembre';

  days: Day[] = [
    { day: 1, status: 'present' }, { day: 3, status: 'absent' }, { day: 5, status: 'present' },
    { day: 8, status: 'present' }, { day: 10, status: 'present' }, { day: 12, status: 'present' },
    { day: 14, status: 'none' }, { day: 17, status: 'absent' }, { day: 19, status: 'present' },
    { day: 21, status: 'none' }, { day: 24, status: 'present' }, { day: 26, status: 'present' },
    { day: 28, status: 'present' },
  ];

  getImageForStatus(status: string) {
    switch (status) {
      case 'present':
        return 'https://cdn-icons-png.flaticon.com/512/13725/13725918.png';
      case 'absent':
        return 'https://cdn-icons-png.flaticon.com/512/3999/3999575.png';
      case 'none':
        return 'https://cdn-icons-png.freepik.com/256/9313/9313256.png';
      default:
        return '';
    }
  }
}
