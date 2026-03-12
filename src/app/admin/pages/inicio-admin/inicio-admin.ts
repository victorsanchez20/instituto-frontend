import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { ProfesorService } from '../../../services/profesor.service';
import { CursoService } from '../../../services/curso.service';
import { AulaService } from '../../../services/aula.service';
import { InscripcionService } from '../../../services/inscripcion.service';

export interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: string;
  bg: string;
  sub: string;
  trend: 'up' | 'warn' | 'down';
}

export interface AccesoRapido {
  label: string;
  icon: string;
  desc: string;
  color: string;
  route: string;
  vista?: string;
}

export interface DistribucionCurso {
  nombre: string;
  total: number;
  color: string;
}

export interface Inscripcion {
  nombre: string;
  curso: string;
  aula: string;
  estado: string;
}




@Component({
  selector: 'app-inicio-admin',
  imports: [NgFor, NgClass],
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css',
})
export class InicioAdmin implements OnInit {

  today: string = '';
  totalAlumnosCount: number = 0;
  totalProfesoresCount: number = 0;
  vista: string = 'crear';


  stats: StatCard[] = [
    {
      label: 'Aulas Activas',
      value: 0,
      icon: '🏫',
      color: '#3B82F6',
      bg: '#EFF6FF',
      sub: '+2 este mes',
      trend: 'up',
    },
    {
      label: 'Alumnos',
      value: 0,
      icon: '🎓',
      color: '#10B981',
      bg: '#ECFDF5',
      sub: '+24 este mes',
      trend: 'up',
    },
    {
      label: 'Profesores',
      value: 0,
      icon: '👨‍🏫',
      color: '#8B5CF6',
      bg: '#F5F3FF',
      sub: '3 pendientes',
      trend: 'warn',
    },
    {
      label: 'Cursos Activos',
      value: 0,
      icon: '📚',
      color: '#F59E0B',
      bg: '#FFFBEB',
      sub: '+1 esta semana',
      trend: 'up',
    },
  ];

  accesosRapidos: AccesoRapido[] = [
    { label: 'Nueva Aula',      icon: '➕', desc: 'Crear y configurar',color: '#3B82F6', route: 'portal/aula' },
    { label: 'Ver Aulas',  icon: '🏫', desc: 'Lista completa',    color: '#0EA5E9', route: 'portal/aula', vista: 'ver'},
    { label: 'Ver Alumnos',     icon: '👤', desc: 'Inscribir nuevo',   color: '#10B981', route: 'portal/alumnos' },
    { label: 'Nuevo Profesor',  icon: '👨‍🏫', desc: 'Lista completa',    color: '#8B5CF6', route: 'portal/profesores' },
    { label: 'Crear Curso',     icon: '📖', desc: 'Diseñar programa',  color: '#F59E0B', route: 'portal/cursos' },
    { label: 'Reportes',        icon: '📊', desc: 'Ver estadísticas',  color: '#EF4444', route: '/admin/reportes' },
  ];

  distribucion: DistribucionCurso[] = [
    { nombre: 'Exactas',      total: 0, color: '#3B82F6' },
    { nombre: 'Humanidades',  total: 0, color: '#8B5CF6' },
    { nombre: 'Idiomas',      total: 0, color: '#10B981' },
    { nombre: 'Tecnología',   total: 0, color: '#F59E0B' },
  ];

  ultimasInscripciones: Inscripcion[] = [
    { nombre: 'Valentina Ríos',   curso: 'Matemáticas Avanzadas', aula: 'A-3', estado: 'Activo'    },
    { nombre: 'Lucas Méndez',     curso: 'Historia del Arte',     aula: 'B-1', estado: 'Activo'    },
    { nombre: 'Camila Torres',    curso: 'Inglés Intermedio',     aula: 'C-2', estado: 'Pendiente' },
    { nombre: 'Mateo García',     curso: 'Ciencias Naturales',    aula: 'A-1', estado: 'Activo'    },
    { nombre: 'Sofía Herrera',    curso: 'Programación Web',      aula: 'D-4', estado: 'Inactivo'  },
  ];

  constructor(private router: Router, 
              private cdr: ChangeDetectorRef,
              private estudianteService: EstudianteService,
              private aulaService: AulaService,
              private inscripcionService: InscripcionService,
              private profesorService: ProfesorService,
              private cursoService: CursoService) {}

  ngOnInit(): void {
    this.today = new Date().toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.cargarTotalAlumnos();
    this.cargaTotalProfesores();
    this.cargarTotalCursos();
    this.cargarTotalAulas();
    this.cargarInscritosPorCurso();
    this.cargarUltimasInscripciones();
  }

 onAccesoRapido(route: string, vista?: string): void {
    this.router.navigate([route], { 
        queryParams: vista ? { vista } : {}     
      });
    
  }

  verTodos(): void {
    this.router.navigate(['/admin/alumnos']);
  }


  cargarTotalAlumnos(): void {
    this.estudianteService.totalAlumno().subscribe({
      next: (data) => {
        this.stats[1].value = data; // 👈 actualizás directo el stats
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener total de alumnos', err);
      }
    });
  }

  cargaTotalProfesores(): void {
    this.profesorService.totalProfesores().subscribe({
      next: (data) => {
        this.stats[2].value = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener total de profesores', err);
      }
    })
  }

  cargarTotalCursos(): void {
    this.cursoService.totalCursos().subscribe({
      next: (data) => {
        this.stats[3].value = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener total de cursos', err);
      }
    })
  }

  cargarTotalAulas(): void {
    this.aulaService.totalAulas().subscribe({
      next: (data) => {
        this.stats[0].value = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener total de aulas', err);
      }
    })
  }

  private colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];
  cargarInscritosPorCurso(): void {
    this.cursoService.totalInscritosPorCurso().subscribe({
      next: (data) => {
        this.distribucion = data.slice(0, 4).map((item, index) => ({
          nombre: item[0],
          total: item[1],
          color: this.colors[index]
        }));

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar distribución', err)
    });
  }

  cargarUltimasInscripciones(): void {
    // Aquí deberías llamar a un servicio que te devuelva las últimas inscripciones
    // Por ahora, dejamos los datos hardcodeados en el array ultimasInscripciones
    this.inscripcionService.obtenerUltimasInscripcionesPendientes().subscribe({
      next: (data) => {
          this.ultimasInscripciones = data.slice(0, 5).map((item) => ({
            nombre: `${item[0]} ${item[1]}`, 
            curso: item[2],
            aula: item[3],
            estado: item[5]
        }));
        console.log('Últimas inscripciones cargadas:', this.ultimasInscripciones);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar últimas inscripciones', err)
    });
  }
}
