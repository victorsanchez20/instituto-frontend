import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  template: `
    <div class="pago-container">
      <div class="pago-card">
        <div class="icon">❌</div>
        <h2>Pago no completado</h2>
        <p>El pago no pudo ser procesado. Si el problema persiste, contacta al administrador.</p>
        <button (click)="router.navigate(['/portal-estudiante/mis-cursos'])">Volver a mis cursos</button>
      </div>
    </div>
  `,
  styles: [`
    .pago-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
    .pago-card { text-align: center; padding: 3rem; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); max-width: 420px; }
    .pago-card h2 { margin: 1rem 0 0.5rem; color: #1e293b; }
    .pago-card p { color: #64748b; }
    .icon { font-size: 3rem; }
    button { margin-top: 1rem; padding: 0.6rem 1.4rem; background: #2563eb; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
  `]
})
export class ErrorPago {
  constructor(public router: Router) {}
}
