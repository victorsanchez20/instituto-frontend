
import { Component, OnInit } from '@angular/core';
import { InscripcionService } from '../../../services/inscripcion.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Curso } from '../../../models/curso';
import { environment } from '../../../../environments/environment';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, NgClass],
  templateUrl: './mis-cursos.html',
  styleUrls: ['./mis-cursos.css']
})
export class MisCursos implements OnInit {

  inscripciones: any[] = [];
  alumnoId!: number;
  loading = true;

  apiUrl: String = environment.api
  hoy = new Date();

  constructor(private inscripcionService: InscripcionService,
              private pagoService: PagoService
  ) {}

  ngOnInit(): void {

    const alumnoStorage = localStorage.getItem('usuarioLogueado');
    if (!alumnoStorage) return;

    const alumno = JSON.parse(alumnoStorage);
    this.alumnoId = alumno.id;

    this.cargarMisCursos();
  }

  cargarMisCursos() {
    this.inscripcionService.getByAlumno(this.alumnoId)
      .subscribe(data => {
        this.inscripciones = data;
        this.loading = false;
      });
  }

  cancelar(inscripcionId: number) {
    this.inscripcionService.delete(inscripcionId)
      .subscribe(() => {
        this.cargarMisCursos(); // 🔁 recargar lista real
      });
  }

  estaEnRango(aula: any): boolean {
    const inicio = new Date(aula.fechaInicio);
    const fin = new Date(aula.fechaFin);
    return this.hoy >= inicio && this.hoy <= fin;
  }

  esDiaDeClase(aula: any): boolean {

    if (!aula.diasClase) return false;

    const dias = aula.diasClase.split(',');

    const hoyTexto = this.hoy.toLocaleDateString('es-ES', { weekday: 'long' })
      .toUpperCase();

    return dias.includes(hoyTexto);
  }

  // ✅ Clase disponible HOY
  claseDisponible(aula: any): boolean {
    return this.estaEnRango(aula) && this.esDiaDeClase(aula);
  }

  cancelarInscripcion(id: any) {
    if (id == null) {
      return;
    }
    this.cancelar(id);
  }

  pagar(ins: any) {
    const cursoId = ins?.aula?.id_curso?.id;
    if (!cursoId) {
      console.error('No se encontró cursoId para el pago.');
      return;
    }

    this.pagoService.crearPago(cursoId)
      .subscribe({
        next: res => {
          window.location.href = res.url;
        },
        error: err => {
          console.error(err);
        }
      });
  }
}