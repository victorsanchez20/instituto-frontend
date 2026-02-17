import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-academica',
  imports: [NgFor],
  templateUrl: './oferta-academica.html',
  styleUrl: './oferta-academica.css',
})
export class OfertaAcademica implements OnInit {
    // Datos para el formulario
  nombre = '';
  descripcion = '';
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  // Lista de cursos
  cursos: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.listarCursos().subscribe({
      next: (data) => {
        this.cursos = data; // Trae los datos tal cual vienen del servidor
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e)
    });
  }

  guardarCurso() {
    if (!this.selectedFile || !this.nombre) {
      alert('Nombre e imagen son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('imagen', this.selectedFile);

    this.cursoService.crearCurso(formData).subscribe({
      next: () => {
        this.listarCursos(); // Recargamos la lista
        this.limpiarFormulario();
        alert('Curso guardado con éxito');
      },
      error: (e) => console.error(e)
    });
  }

  // Métodos de apoyo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.selectedFile = null;
    this.previewImage = null;
    this.cdr.detectChanges();
  }

  ingresarCurso(id: number) {
    if (id) {
      // IMPORTANTE: La ruta ahora es /portal-estudiante/curso/id
      this.router.navigate(['/portal-estudiante/curso', id]);
    } else {
      console.error("No se encontró el ID del curso");
    }
  }
}
