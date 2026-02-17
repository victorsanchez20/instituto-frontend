import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-curso',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './curso.html',
  styleUrl: './curso.css',
})
export class CursoComponet implements OnInit {

  nombre = '';
  descripcion = '';

  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  cursos: Curso[] = [];

  ngOnInit(): void {
      this.listarCursos();
  }

  constructor(private cursoService: CursoService,
              private cdr: ChangeDetectorRef
  ) {
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

    this.cursoService.crearCurso(formData).subscribe({
      next: () => {
        this.listarCursos();
        this.nombre = '';
        this.descripcion = '';
        this.selectedFile = null;
        this.previewImage = null;
        alert('Curso guardado con éxito');
      },
      error: (e) => console.error(e)
    });
  }

  listarCursos() {
    this.cursoService.listarCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e)
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        // 1. Asignamos la imagen
        this.previewImage = e.target.result;

        // 2. FORZAMOS A ANGULAR A MIRAR LOS CAMBIOS
        // Esto hace que la imagen aparezca al instante sin trucos
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.previewImage = null;
      this.cdr.detectChanges();
    }
  }

  eliminar(id: any) {
    // 1. Confirmación de seguridad
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      
      this.cursoService.eliminarCurso(id).subscribe({
        next: () => {
          // 2. Filtramos el array local para que desaparezca de la vista de inmediato
          this.cursos = this.cursos.filter(c => c.id !== id);
          console.log('Curso eliminado con éxito');
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar el curso.');
        }
      });
      this.cdr.detectChanges();
    }
  }
}
