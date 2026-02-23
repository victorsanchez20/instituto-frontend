import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private apiUrl = `${environment.api}/api/instituto/estado`;

  constructor(private http: HttpClient) {}

  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.apiUrl);
  }
}
