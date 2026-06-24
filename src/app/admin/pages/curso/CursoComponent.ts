import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Curso } from '../../../models/curso';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './curso.html',
  styleUrl: './curso.css',
})
export class CursoComponet implements OnInit {

  nombre = '';
  descripcion = '';
  precio = '';

  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  cursos: Curso[] = [];

  apiUrl: String = environment.api

  ngOnInit(): void {
      this.listarCursos();
  }

  constructor(private cursoService: CursoService,
              private cdr: ChangeDetectorRef
  ) {
  }

  guardarCurso() {
    if (!this.selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Imagen requerida',
        text: 'Por favor, seleccione una imagen para el curso.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('precio', this.precio);
    formData.append('descripcion', this.descripcion);
    formData.append('imagen', this.selectedFile);

    this.cursoService.crearCurso(formData).subscribe({
      next: () => {
        this.listarCursos();
        this.nombre = '';
        this.descripcion = '';
        this.precio = '';
        this.selectedFile = null;
        this.previewImage = null;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Curso guardado con éxito.',
        });
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
    // 1. Confirmación de seguridad con SweetAlert2
    Swal.fire({
      title: '¿Eliminar curso?',
      text: '¿Estás seguro de que deseas eliminar este curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.eliminarCurso(id).subscribe({
          next: () => {
            // 2. Filtramos el array local para que desaparezca de la vista de inmediato
            this.cursos = this.cursos.filter(c => c.id !== id);
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'El curso ha sido eliminado correctamente.',
            });
            console.log('Curso eliminado con éxito');
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el curso.',
            });
          }
        });
        this.cdr.detectChanges();
      }
    });
  }
}
