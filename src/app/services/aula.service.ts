import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Aula } from '../models/aula';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
 
  private apiUrl = `${environment.api}/api/instituto/aula`

  constructor(private http: HttpClient) {}

  crearAula(aula: Aula) {
    return this.http.post(this.apiUrl, aula);
  }

  listarAulas() {
    return this.http.get<Aula[]>(`${this.apiUrl}`)
  }
}