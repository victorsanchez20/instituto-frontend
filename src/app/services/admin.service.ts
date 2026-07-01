import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private authUrl = `${environment.api}/api/auth/login/admin`;

  constructor(private http: HttpClient) {}

  login(user: string, pass: string): Observable<any> {
    return this.http.post(this.authUrl, { user, pass });
  }
}
