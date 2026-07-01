import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  alumno: Estudiante | null = null;
  editando = false;

  passwordModal = false;
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    const data = localStorage.getItem('usuarioLogueado');
    if (data) {
      this.alumno = JSON.parse(data);
      if (this.alumno?.id) {
        this.estudianteService.getById(this.alumno.id).subscribe({
          next: (res) => {
            this.alumno = res;
            localStorage.setItem('usuarioLogueado', JSON.stringify(res));
          },
          error: () => console.error('Error al cargar datos del perfil'),
        });
      }
    }
  }

  activarEdicion(): void {
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
    if (this.alumno?.id) {
      this.estudianteService.getById(this.alumno.id).subscribe({
        next: (res) => (this.alumno = res),
      });
    }
  }

  guardarCambios(): void {
    if (!this.alumno?.nombres?.trim() || !this.alumno?.apellidos?.trim()) {
      Swal.fire('Validación', 'Nombre y apellidos son obligatorios', 'warning');
      return;
    }
    if (!this.alumno?.email?.trim()) {
      Swal.fire('Validación', 'El email es obligatorio', 'warning');
      return;
    }

    this.estudianteService.updateAlumno(this.alumno.id!, this.alumno).subscribe({
      next: (res) => {
        this.alumno = res;
        localStorage.setItem('usuarioLogueado', JSON.stringify(res));
        this.editando = false;
        Swal.fire('Guardado', 'Datos actualizados correctamente', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudieron guardar los cambios', 'error'),
    });
  }

  abrirModalPassword(): void {
    this.passwordModal = true;
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  cerrarModalPassword(): void {
    this.passwordModal = false;
  }

  cambiarPassword(): void {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      Swal.fire('Validación', 'Todos los campos son obligatorios', 'warning');
      return;
    }
    if (this.newPassword.length < 6) {
      Swal.fire('Validación', 'La nueva contraseña debe tener al menos 6 caracteres', 'warning');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire('Validación', 'Las contraseñas nuevas no coinciden', 'warning');
      return;
    }

    this.estudianteService.changePassword(this.alumno!.id!, this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.cerrarModalPassword();
        Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success');
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire('Error', 'La contraseña actual es incorrecta', 'error');
        } else {
          Swal.fire('Error', 'No se pudo cambiar la contraseña', 'error');
        }
      },
    });
  }
}
