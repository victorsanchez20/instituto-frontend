import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
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
    if(this.registroData.password !== this.registroData.confirmar) {
      alert('Las contraseñas no coinciden');
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
        alert('¡Registro exitoso!');
        this.irALogin();
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
}
