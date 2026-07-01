import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnuncioService, Anuncio } from '../../../services/anuncio.service';

interface CursoEnCurso {
  titulo: string;
  icono: string;
  progreso: number;
}

interface ProximoPaso {
  icono: string;
  titulo: string;
  detalle: string;
  tipo: 'entrega' | 'webinar' | 'leccion';
}

interface WelcomeStats {
  cursosInscritos: number;
  progresoTotal: number;
  certificados: number;
}

@Component({
  selector: 'app-inicio',
  imports: [NgFor, NgIf, NgClass, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  alumno: any = null;
  anuncios: Anuncio[] = [];
  slideIndex = 0;

  // TODO: reemplazar con datos reales del backend cuando exista el endpoint
  // de progreso académico. Por ahora se mantienen en 0 / vacío.
  stats: WelcomeStats = {
    cursosInscritos: 0,
    progresoTotal: 0,
    certificados: 0,
  };

  // TODO: reemplazar con la data real del "inicio rápido" de cada curso
  // (progreso por curso) cuando esa funcionalidad esté lista.
  cursosEnCurso: CursoEnCurso[] = [];

  // TODO: reemplazar con la data real de próximas entregas / webinars /
  // lecciones recomendadas cuando exista esa fuente de datos.
  proximosPasos: ProximoPaso[] = [];

  constructor(
    private anuncioService: AnuncioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('usuarioLogueado');
    if (data) {
      this.alumno = JSON.parse(data);
    }
    this.cargarAnuncios();
  }

  get inicialAlumno(): string {
    const nombre = this.alumno?.nombres?.trim();
    return nombre ? nombre.charAt(0).toUpperCase() : 'E';
  }

  cargarAnuncios(): void {
    this.anuncioService.getActivos().subscribe({
      next: (data) => {
        this.anuncios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar anuncios', err),
    });
  }

  nextSlide(): void {
    this.slideIndex = (this.slideIndex + 1) % this.anuncios.length;
  }

  prevSlide(): void {
    this.slideIndex =
      this.slideIndex === 0 ? this.anuncios.length - 1 : this.slideIndex - 1;
  }

  irASlide(index: number): void {
    this.slideIndex = index;
  }
}