import { Curso } from "./curso";
import { Profesor } from "./profesor."; // Corregido el punto extra en el nombre

export interface Aula {
    id?: number;
    codigo: string;
    duracion: string;
    cantidad: number;
    // IMPORTANTE: Cambiamos string por string[] porque enviamos una lista de días
    dias: string[]; 
    
    fecha_inicio: string; // No olvides las fechas que agregaste en Java
    fecha_fin: string;
    
    id_curso: Curso;
    id_profesor: Profesor;
}