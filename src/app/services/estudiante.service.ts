import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {

  private apiUrl = `${environment.api}/api/instituto/alumno`;
  
  constructor(private http: HttpClient) {}

  saveAlumno(estudiante: Estudiante) {
    return this.http.post(this.apiUrl, estudiante);
  }

  readAlumno() {
    return this.http.get(this.apiUrl);
  }
}
