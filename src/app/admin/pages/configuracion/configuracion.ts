import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AnuncioService, Anuncio } from '../../../services/anuncio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, DatePipe],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion implements OnInit {
  anuncios: Anuncio[] = [];
  formulario: Anuncio = this.anuncioVacio();
  editando: boolean = false;

  constructor(
    private anuncioService: AnuncioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  anuncioVacio(): Anuncio {
    return { titulo: '', descripcion: '', imagenUrl: '', activo: true };
  }

  cargarAnuncios(): void {
    this.anuncioService.getAll().subscribe({
      next: (data) => {
        this.anuncios = data;
        this.cdr.detectChanges();
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar los anuncios', 'error'),
    });
  }

  nuevo(): void {
    this.formulario = this.anuncioVacio();
    this.editando = false;
  }

  editar(a: Anuncio): void {
    this.formulario = { ...a };
    this.editando = true;
  }

  guardar(): void {
    if (!this.formulario.titulo || !this.formulario.descripcion) {
      Swal.fire('Campos requeridos', 'Título y descripción son obligatorios', 'warning');
      return;
    }

    const request = this.formulario.id
      ? this.anuncioService.actualizar(this.formulario.id, this.formulario)
      : this.anuncioService.crear(this.formulario);

    request.subscribe({
      next: () => {
        Swal.fire('Guardado', 'Anuncio guardado correctamente', 'success');
        this.nuevo();
        this.cargarAnuncios();
        this.cdr.detectChanges();
      },
      error: () => Swal.fire('Error', 'No se pudo guardar el anuncio', 'error'),
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: 'Eliminar anuncio',
      text: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.anuncioService.eliminar(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Anuncio eliminado', 'success');
            if (this.formulario.id === id) this.nuevo();
            this.cargarAnuncios();
            this.cdr.detectChanges();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error'),
        });
      }
    });
  }
}
