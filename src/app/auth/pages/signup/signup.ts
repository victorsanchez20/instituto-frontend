import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  registroData = {
    nombre: '',       // En tu Java es nombre_completo
    apellidos: '',
    documento: '',    // Agregado para tu modelo Java
    fechaNacimiento: '', // Agregado para tu modelo Java
    usuario: '',
    correo: '',       
    email: '',        // Tu Java pide ambos: correo y email
    password: '',
    confirmar: ''
  };

  // 1. ELIMINAMOS 'private estudiante: Estudiante' del constructor
  constructor(private router: Router, private estudianteService: EstudianteService) {}

  registrar() {
    if (!this.registroData.nombre.trim()) {
      this.mostrarAlerta('warning', 'Nombre requerido', 'Ingresa tus nombres.');
      return;
    }

    if (!this.registroData.apellidos.trim()) {
      this.mostrarAlerta('warning', 'Apellido requerido', 'Ingresa tus apellidos.');
      return;
    }

    if (!this.registroData.usuario.trim()) {
      this.mostrarAlerta('warning', 'Usuario requerido', 'Ingresa tu usuario.');
      return;
    }


    if (!this.registroData.correo.trim()) {
      this.mostrarAlerta('warning', 'Correo requerido', 'Ingresa tu correo electronico.');
      return;
    }


    if (this.registroData.password !== this.registroData.confirmar) {
      this.mostrarAlerta('warning', 'Contraseñas diferentes', 'Las contraseñas deben coincidir.');
      return;
    }

    // 2. Preparamos el objeto para que coincida con la Interfaz y Java
    // Copiamos correo a email para que no falle el @Column de Java
    const nuevoEstudiante: Estudiante = {
      nombres: this.registroData.nombre,
      apellidos: this.registroData.apellidos,
      usuario: this.registroData.usuario,
      email: this.registroData.correo, // Duplicamos por consistencia con tu modelo
      password: this.registroData.password
    };

    // 3. Llamada al servicio
    this.estudianteService.saveAlumno(nuevoEstudiante).subscribe({
      next: (res) => {
        Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada correctamente.',
        timer: 1500,
        showConfirmButton: false
        })

        setTimeout(() => {
          this.irALogin();
        }, 2000);

      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Hubo un error en el registro. Revisa la consola.');
      }
    });
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  private mostrarAlerta(
    icon: 'success' | 'error' | 'warning',
    titulo: string,
    mensaje: string
  ) {
    Swal.fire({
      icon,
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#1d4ed8',
      background: '#ffffff',
      color: '#1f2937',
      customClass: {
        popup: 'mi-alerta'
      },
    });
  }
}
