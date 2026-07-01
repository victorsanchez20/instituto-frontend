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

  login(user: string, pass: string): Observable<any> {
    return this.http.post(this.authUrl, { user, pass });
  }

  getById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`);
  }

  saveAlumno(estudiante: Estudiante) {
    return this.http.post(this.apiUrl, estudiante);
  }

  updateAlumno(id: number, estudiante: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}/${id}`, estudiante);
  }

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/password`, { oldPassword, newPassword });
  }

  readAlumno() {
    return this.http.get(this.apiUrl);
  }

  totalAlumno(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
}
