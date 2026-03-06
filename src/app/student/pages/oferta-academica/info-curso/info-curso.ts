import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Curso } from '../../../../models/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Aula } from '../../../../models/aula';
import { Inscripcion } from '../../../../models/inscripcion';
import { InscripcionService } from '../../../../services/inscripcion.service';
import { InscripcionCreate } from '../../../../models/inscripcion-create';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-info-curso',
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './info-curso.html',
  styleUrl: './info-curso.css',
})
export class InfoCurso implements OnInit {
  // Inicializamos el objeto para evitar errores de "undefined" en el HTML
  curso: Curso | any = {};
  aulas: any[] = [];
  loading: boolean = true;

  apiUrl: String = environment.api

  inscripcionesAlumno: any[] = [];
  aulasInscritasIds: number[] = [];
  cursoBloqueado: boolean = false;
  alumnoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private inscripcionService: InscripcionService
  ) { }

  ngOnInit(): void {
    const alumnoStorage = localStorage.getItem('usuarioLogueado');

    if (alumnoStorage) {
      const alumno = JSON.parse(alumnoStorage);
      this.alumnoId = alumno.id;
      this.cargarInscripcionesAlumno();
    }
    // 1. Obtenemos el ID desde la URL (ej: /cursos/5)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.cargarDetalleCurso(id);
      this.cargarAulasCursos(id);
    }
  }

  cargarInscripcionesAlumno() {
    this.inscripcionService.getByAlumno(this.alumnoId)
      .subscribe(data => {

        console.log("INSCRIPCIONES DEL BACK:", data);

        this.inscripcionesAlumno = data;
        this.aulasInscritasIds = data.map((i: any) => i.aula.id);
        const cursoActual = Number(this.route.snapshot.paramMap.get('id'));
        this.cursoBloqueado = data.some((i: any) => i.aula.idCurso.id === cursoActual);

        this.cdr.detectChanges();
      });
  }

  yaInscritoEnAula(aulaId: number): boolean {
    return this.aulasInscritasIds.includes(aulaId);
  }

  cancelar(inscripcionId: number | undefined) {

    if (!inscripcionId) {
      console.error("ID de inscripción inválido");
      return;
    }

    this.inscripcionService.delete(inscripcionId).subscribe(() => {

      // 🔁 VOLVER A CONSULTAR TODO DESDE BACKEND
      this.cargarInscripcionesAlumno();

      const cursoId = this.route.snapshot.paramMap.get('id');
      if (cursoId) {
        this.cargarAulasCursos(cursoId);
      }

    });
  }



  cargarDetalleCurso(id: string) {
    this.loading = true;
    this.http.get<Curso>(`${environment.api}/api/instituto/curso/${id}`)
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos del servidor:', data); // REVISA ESTO EN F12
          this.curso = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error en la petición:', err);
          this.loading = false;
        }
      });
  }

  cargarCantidadInscritos() {
    this.inscripcionService.getCantidadPorAula()
      .subscribe(data => {

        // Convertimos a diccionario: {1:3, 2:10}
        const conteo: any = {};
        data.forEach(x => conteo[x.idAula] = x.cantidad);

        // 🔥 mezclamos con las aulas cargadas
        this.aulas = this.aulas.map(aula => ({
          ...aula,
          inscritos: conteo[aula.id] || 0
        }));

        this.cdr.detectChanges();
      });
  }


  cargarAulasCursos(id: string) {
    this.http.get<any[]>(`${environment.api}/api/instituto/curso/${id}/aulas`)
      .subscribe({
        next: (data) => {

          this.aulas = data.map(aula => {
            const inscripcion = this.inscripcionesAlumno.find(
              (i: any) => i.aula.id === aula.id
            );

            return {
              ...aula,
              yaInscrito: !!inscripcion,
              inscripcionId: inscripcion?.idInscripcion,
              inscritos: 0 // ← lo llenará backend
            };
          });
          this.cargarCantidadInscritos();

          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }


  irAtras() {
    window.history.back();
  }

  inscribirme(aulaId: number) {
    const alumnoStorage = localStorage.getItem('usuarioLogueado');
    if (!alumnoStorage) {
      alert('Debe iniciar sesión para inscribirse');
      this.router.navigate(['/login']);
      return;
    }

    const alumno = JSON.parse(alumnoStorage);

    const payload: InscripcionCreate = {
      alumnoId: alumno.id,
      aulaId: aulaId
    };

    this.inscripcionService.save(payload).subscribe(() => {

    this.cargarInscripcionesAlumno();

    const cursoId = this.route.snapshot.paramMap.get('id');
    if (cursoId) {
      this.cargarAulasCursos(cursoId);
    }

  });
  }
}