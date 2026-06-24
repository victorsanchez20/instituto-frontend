import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { EstudianteService } from '../../../services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // Estado para saber qué login mostrar
  tipoUsuario: 'alumno' | 'admin' = 'alumno';

  user: string = '';
  pass: string = '';

  constructor(private router: Router, private estudianteService: EstudianteService) {}

  setTipo(tipo: 'alumno' | 'admin') {
    this.tipoUsuario = tipo;
    // Opcional: limpiar campos al cambiar de pestaña
    this.user = '';
    this.pass = '';
  }

  validarUsuario() {
    // Aquí puedes diferenciar la lógica
    if (this.tipoUsuario === 'admin') {
      if (this.user === 'admin' && this.pass === '12345') {
        this.router.navigate(['/portal']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'Usuario o contraseña de administrador no son válidos.',
        });
      }
    } else {
      this.estudianteService.login(this.user, this.pass).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          console.log(this.user, this.pass);
          localStorage.setItem('usuarioLogueado', JSON.stringify(response));
          this.router.navigate(['/portal-estudiante'])  
        },
        error: (err) => {
          console.error(err);
          console.log(this.user, this.pass);
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Usuario y contraseña incorrectos.',
          });
        }
      })
    }
  }
} 
