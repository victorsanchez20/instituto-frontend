import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Estudiante } from '../models/estudiante';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {

  private apiUrl = `${environment.api}/api/instituto/alumno`;
  private authUrl = `${environment.api}/api/auth/login`;
  
  constructor(private http: HttpClient) {}

  // Método para el login
  login(user: string, pass: string): Observable<any> {
    // Enviamos el objeto tal cual lo espera el Map<String, String> de Java
    return this.http.post(this.authUrl, { user, pass });
  }

  saveAlumno(estudiante: Estudiante) {
    return this.http.post(this.apiUrl, estudiante);
  }

  readAlumno() {
    return this.http.get(this.apiUrl);
  }
}
