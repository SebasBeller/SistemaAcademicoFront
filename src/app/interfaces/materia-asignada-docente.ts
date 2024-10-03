import { Materia } from './materia';
import { Profesor } from './profesor';
export interface MateriaAsignadaDocente {
  unidades: never[];
titulo: any|string;
imagen: any;
paralelo: any;
    id_dicta: number;
    fecha:Date;
    materia?: Materia;
    profesor?: Profesor;

}
