import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Anuncio {
  id?: number;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  fechaCreacion?: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AnuncioService {
  private apiUrl = `${environment.api}/api/instituto/anuncios`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.apiUrl);
  }

  getActivos(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${this.apiUrl}/activos`);
  }

  crear(anuncio: Anuncio): Observable<Anuncio> {
    return this.http.post<Anuncio>(this.apiUrl, anuncio);
  }

  actualizar(id: number, anuncio: Anuncio): Observable<Anuncio> {
    return this.http.put<Anuncio>(`${this.apiUrl}/${id}`, anuncio);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
