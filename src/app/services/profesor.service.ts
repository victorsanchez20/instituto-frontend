import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Profesor } from '../models/profesor.';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  
  private apiUrl = `${environment.api}/api/instituto/profesor`;

  constructor(private http: HttpClient) {}

  saveProfesor(profesor: Profesor) {
    return this.http.post(this.apiUrl, profesor);
  }

  leerProfesores() {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  eliminarProfesor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
