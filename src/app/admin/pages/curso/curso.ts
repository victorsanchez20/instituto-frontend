import { ChangeDetectorRef, Component } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-curso',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './curso.html',
  styleUrl: './curso.css',
})
export class Curso {

  nombre = '';
  descripcion = '';

  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  cursos: any[] = [];

  constructor(private cursoService: CursoService) {
    this.listarCursos();
  }

  guardarCurso() {
    if (!this.selectedFile) {
      alert('Seleccione una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('imagen', this.selectedFile);

    this.cursoService.crearCurso(formData).subscribe(() => {
      this.listarCursos();

      // limpiar
      this.nombre = '';
      this.descripcion = '';
      this.selectedFile = null;
      this.previewImage = null;
    });
  }

  listarCursos() {
    this.cursoService.listarCursos().subscribe(data => {
      this.cursos = data;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    // vista previa inmediata (NO botón extra)
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
