import{Asistencia} from './asistencia'
import{Paralelo} from './paralelo'
export interface Estudiante {
    id_estudiante: number;
    nombre: string;
    apellido: string;
    paralelo?: Paralelo;
}
