import { Materia } from './materia';
import { Profesor } from './profesor';
import { Asistencia } from './asistencia';
export interface MateriaAsignadaDocente {
  id_dicta: number;
  unidades: never[];
  titulo: any | string;
  imagen: any;
  paralelo: any;
  fecha: Date;
  materia?: Materia;
  profesor?: Profesor;
  asistencias?: Asistencia[];
  inscripciones?: any[];

}
