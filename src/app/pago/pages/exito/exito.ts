import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-exito',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="pago-container">
      <div class="pago-card" *ngIf="status === 'verificando'">
        <div class="spinner"></div>
        <h2>Verificando pago...</h2>
        <p>Por favor espera mientras confirmamos tu pago.</p>
      </div>
      <div class="pago-card success" *ngIf="status === 'approved'">
        <div class="icon">✅</div>
        <h2>¡Pago exitoso!</h2>
        <p>Tu inscripción ha sido confirmada. Serás redirigido a tus cursos...</p>
      </div>
      <div class="pago-card error" *ngIf="status === 'error'">
        <div class="icon">❌</div>
        <h2>Error al verificar pago</h2>
        <p>{{ mensaje }}</p>
        <button (click)="router.navigate(['/portal-estudiante/mis-cursos'])">Ir a mis cursos</button>
      </div>
    </div>
  `,
  styles: [`
    .pago-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
    .pago-card { text-align: center; padding: 3rem; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); max-width: 420px; }
    .pago-card h2 { margin: 1rem 0 0.5rem; color: #1e293b; }
    .pago-card p { color: #64748b; }
    .icon { font-size: 3rem; }
    .spinner { width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: #2563eb; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto; }
    @keyframes spin { to { transform: rotate(360deg); } }
    button { margin-top: 1rem; padding: 0.6rem 1.4rem; background: #2563eb; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
  `]
})
export class Exito implements OnInit {
  status: 'verificando' | 'approved' | 'error' = 'verificando';
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private pagoService: PagoService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const paymentId = this.route.snapshot.queryParamMap.get('payment_id');
    const status = this.route.snapshot.queryParamMap.get('status');
    const externalRef = this.route.snapshot.queryParamMap.get('external_reference');

    if (status === 'approved' && paymentId) {
      this.pagoService.verificarPago(paymentId).subscribe({
        next: (res) => {
          this.status = 'approved';
          setTimeout(() => this.router.navigate(['/portal-estudiante/mis-cursos']), 2000);
        },
        error: () => {
          this.status = 'error';
          this.mensaje = 'No se pudo confirmar el pago. Contacta al administrador.';
        }
      });
    } else if (paymentId) {
      this.pagoService.verificarPago(paymentId).subscribe({
        next: (res) => {
          if (res.status === 'approved') {
            this.status = 'approved';
            setTimeout(() => this.router.navigate(['/portal-estudiante/mis-cursos']), 2000);
          } else {
            this.status = 'error';
            this.mensaje = 'El pago no fue aprobado. Estado: ' + res.status;
          }
        },
        error: () => {
          this.status = 'error';
          this.mensaje = 'Error al verificar el pago.';
        }
      });
    } else {
      this.status = 'error';
      this.mensaje = 'No se recibió información del pago.';
    }
  }
}
