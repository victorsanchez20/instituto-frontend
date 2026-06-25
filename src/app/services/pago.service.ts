import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface PagoRequest {
  cursoId: number;
  title?: string;
  quantity?: number;
  currencyId?: string;
  unitPrice?: number;
}

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
    return this.http.post<PagoResponse>(
      `${this.api}/crear`,
      { cursoId }
    );
  }

}