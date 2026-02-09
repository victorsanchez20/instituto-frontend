import { Curso } from "./curso";
import { Profesor } from "./profesor.";


export interface Aula {
    id?: number,
    codigo: string,
    duracion: string,
    dias: string,
    id_curso: Curso,
    id_profesor: Profesor
}