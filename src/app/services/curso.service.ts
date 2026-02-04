import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
    return this.http.get<any[]>(this.apiUrl);
  }
}
