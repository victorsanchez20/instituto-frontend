import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl = `${environment.api}/api/instituto/curso`;

  constructor(private http: HttpClient) {}

  crearCurso(formData: FormData) {
    return this.http.post(
      `${this.apiUrl}/guardar-con-imagen`,
      formData
    );
  }
  
  listarCursos() {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  eliminarCurso(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
