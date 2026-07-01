import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profesor } from '../../../models/profesor.';
import { ProfesorService } from '../../../services/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './profesor.html',
  styleUrl: './profesor.css',
})
export class ProfesorComponent implements OnInit {

  vista: 'crear' | 'ver' | 'editar' = 'crear';
  editandoId: number | null = null;

  profesores: Profesor[] = [];
  busqueda: string = '';
  cargando: boolean = false;

  profesor: Profesor = {
    nombre: '',
    apellido: '',
    docidentidad: '',
    telefono: '',
    especialidad: '',
    email: '',
    usuario: '',
    password: ''
  };

  ngOnInit(): void {
      this.cargarProfesores();
  }

  constructor(private profesorService: ProfesorService,
              private cdr: ChangeDetectorRef
  ) {}

  crearProfesor() {
    if (!this.validarFormulario()) return;

    this.cargando = true;
    this.profesorService.saveProfesor(this.profesor).subscribe({
      next: () => {
        this.cargando = false;
        this.vista = 'ver';
        this.resetFormulario();
        this.cargarProfesores();
        Swal.fire({ icon: 'success', title: 'Profesor registrado', text: 'El profesor se registró correctamente.', timer: 2000, showConfirmButton: false });
      },
      error: (err) => {
        this.cargando = false;
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar al profesor.' });
      }
    })
  }

  editarProfesor(p: Profesor) {
    this.profesor = { ...p, password: '' };
    this.editandoId = p.id ?? null;
    this.vista = 'editar';
    this.cdr.detectChanges();
  }

  actualizarProfesor() {
    if (!this.validarFormulario()) return;
    if (this.editandoId == null) return;

    this.cargando = true;
    const payload = { ...this.profesor };
    this.profesorService.actualizarProfesor(this.editandoId, payload).subscribe({
      next: () => {
        this.cargando = false;
        this.vista = 'ver';
        this.editandoId = null;
        this.resetFormulario();
        this.cargarProfesores();
        Swal.fire({ icon: 'success', title: 'Profesor actualizado', text: 'Los datos se actualizaron correctamente.', timer: 2000, showConfirmButton: false });
      },
      error: (err) => {
        this.cargando = false;
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar al profesor.' });
      }
    });
  }

  cargarProfesores() {
    this.profesorService.leerProfesores().subscribe({
      next: (data: Profesor[]) => {
        this.profesores = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los profesores.' });
      }
    });
  }

  profesoresFiltrados(): Profesor[] {
    return this.profesores.filter(p =>
      `${p.nombre} ${p.apellido}`
        .toLowerCase()
        .includes(this.busqueda.toLowerCase())
    );
  }

  eliminarProfesor(id: any) {
    Swal.fire({
      title: '¿Eliminar profesor?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.profesorService.eliminarProfesor(id).subscribe({
          next: () => {
            this.cargarProfesores();
            Swal.fire({ icon: 'success', title: 'Eliminado', text: 'El profesor fue eliminado.', timer: 2000, showConfirmButton: false });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar al profesor.' });
          }
        });
      }
    });
  }

  cancelarEdicion() {
    this.vista = 'ver';
    this.editandoId = null;
    this.resetFormulario();
  }

  private validarFormulario(): boolean {
    const p = this.profesor;
    if (!p.nombre?.trim() || !p.apellido?.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Nombre y apellido son obligatorios.' });
      return false;
    }
    if (!p.docidentidad?.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'El documento de identidad es obligatorio.' });
      return false;
    }
    return true;
  }

  private resetFormulario() {
    this.profesor = {
      nombre: '',
      apellido: '',
      docidentidad: '',
      telefono: '',
      especialidad: '',
      email: '',
      usuario: '',
      password: ''
    };
  }

}
