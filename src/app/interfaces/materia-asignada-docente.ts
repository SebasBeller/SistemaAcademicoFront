import { Materia } from './materia';
import { Profesor } from './profesor';
export interface MateriaAsignadaDocente {
    id_dicta: number;
    fecha:Date;
    materia?: Materia;
    profesor?: Profesor;

}
