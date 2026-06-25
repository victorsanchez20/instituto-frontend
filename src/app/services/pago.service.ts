import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface PagoResponse {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private http = inject(HttpClient);

  private api = `${environment.api}/api/pagos`;

  crearPago(cursoId: number): Observable<PagoResponse> {
    const params = new HttpParams().set('cursoId', String(cursoId));
    return this.http.post<PagoResponse>(
      `${this.api}/crear`,
      null,
      { params }
    );
  }

}