import { Materia } from './materia';
import { Profesor } from './profesor';
import { Asistencia } from './asistencia';
export interface MateriaAsignadaDocente {
  unidades: never[];
  titulo: any | string;
  imagen: any;
  paralelo: any;
  id_dicta: number;
  fecha: Date;
  materia?: Materia;
  profesor?: Profesor;
  asistencias?: Asistencia[];
  inscripciones?: any[];

}
