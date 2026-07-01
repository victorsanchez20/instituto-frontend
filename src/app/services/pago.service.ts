import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface PagoResponse {
  url: string;
}

export interface VerificarResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private http = inject(HttpClient);
  private api = `${environment.api}/api/pagos`;

  crearPago(inscripcionId: number): Observable<PagoResponse> {
    const frontendUrl = window.location.origin;
    const params = new HttpParams()
      .set('inscripcionId', String(inscripcionId))
      .set('frontendUrl', frontendUrl);
    return this.http.post<PagoResponse>(`${this.api}/crear`, null, { params });
  }

  verificarPago(paymentId: string): Observable<VerificarResponse> {
    const params = new HttpParams().set('paymentId', paymentId);
    return this.http.get<VerificarResponse>(`${this.api}/verificar`, { params });
  }

}
