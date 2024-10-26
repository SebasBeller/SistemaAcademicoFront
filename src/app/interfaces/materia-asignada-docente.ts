import { Materia } from './materia';
import { Profesor } from './profesor';
import { Asistencia } from './asistencia';
export interface MateriaAsignadaDocente {
  materiaId(materiaId: any): unknown;
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
  trimestre1?: number; // O el tipo que estés usando
  trimestre2?: number;
  trimestre3?: number;
  promedio?: number;
}
