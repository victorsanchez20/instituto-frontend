import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inscripcion } from '../models/inscripcion';
import { InscripcionCreate } from '../models/inscripcion-create';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {

  private apiUrl = `${environment.api}/api/instituto/inscripcion`;

  constructor(private http: HttpClient) {}

  save(inscripcion: InscripcionCreate) {
    return this.http.post(`${this.apiUrl}`, inscripcion);
  }


  readByAlumno(id: number) {
    return this.http.get(`${this.apiUrl}/alumno/${id}`);
  }

  getByAlumno(alumnoId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/alumno/${alumnoId}`);
  }
  delete(inscripcionId: number) {
    return this.http.delete(`${this.apiUrl}/${inscripcionId}`);
  }

  getCantidadPorAula() {
    return this.http.get<any[]>(`${this.apiUrl}/cantidad-por-aula`);
  }

  listarInscripciones() {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}`)
  }

  readStudentsEnrolledByIdClassroom(id: number) {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}/aula/${id}`);
  } 

  actualizarInscripcion(idInscripcion: number, estadoId: Inscripcion) {
    return this.http.put(`${this.apiUrl}/estado/${idInscripcion}`, 
      { estadoId: estadoId}
    );
  }
}

