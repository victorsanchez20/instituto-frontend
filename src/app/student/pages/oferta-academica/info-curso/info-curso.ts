import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Curso } from '../../../../models/curso';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Aula } from '../../../../models/aula';
import { Inscripcion } from '../../../../models/inscripcion';
import { InscripcionService } from '../../../../services/inscripcion.service';
import { InscripcionCreate } from '../../../../models/inscripcion-create';

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private inscripcionService: InscripcionService
  ) { }

  ngOnInit(): void {
    // 1. Obtenemos el ID desde la URL (ej: /cursos/5)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.cargarDetalleCurso(id);
      this.cargarAulasCursos(id);
    }
  }

  cargarDetalleCurso(id: string) {
    this.loading = true;
    this.http.get<Curso>(`http://localhost:8080/api/instituto/curso/${id}`)
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

  cargarAulasCursos(id: string) {
    this.http.get<any[]>(`http://localhost:8080/api/instituto/curso/${id}/aulas`).subscribe({
      next: (data) => {
        console.log('Aulas recibidas:', data);
        this.aulas = data; // Guardamos en la variable local aulas
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en la peticion.', err);
        this.loading = false;
      }
    });
  }

  // Método opcional por si quieres un botón de "Volver"
  irAtras() {
    window.history.back();
  }

  inscribirme(aulaId: number) {

  const alumnoStorage = localStorage.getItem('alumno');

  if (!alumnoStorage) {
    alert('Debe iniciar sesión');
    return;
  }

  const alumno = JSON.parse(alumnoStorage);

  const payload: InscripcionCreate = {
    alumnoId: alumno.id,
    aulaId: aulaId
  };

  this.inscripcionService.save(payload).subscribe({
    next: () => {
      alert('Inscripción realizada');
      const cursoId = this.route.snapshot.paramMap.get('id');
      if (cursoId) this.cargarAulasCursos(cursoId);
    },
    error: (err) => console.error(err)
  });
}
}