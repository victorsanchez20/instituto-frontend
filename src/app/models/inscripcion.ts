import { Aula } from "./aula";
import { Estado } from "./estado";
import { Estudiante } from "./estudiante";

export interface Inscripcion {
    id?: number;
    alumno: Estudiante;
    aula: Aula;
    fechaCreacion: Date;
    estado: Estado;
}