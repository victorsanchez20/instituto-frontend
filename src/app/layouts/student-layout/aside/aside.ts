import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Estudiante } from '../../../models/estudiante';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './aside.html',
  styleUrls: ['./aside.css'],
})
export class Aside {

  // Recibimos los datos desde el layout padre
  @Input() datosAlumno: Estudiante | null = null;

  constructor(private router: Router) {}

  logout() {
    // 1. Preguntamos al usuario para evitar cierres accidentales
    const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');

    if (confirmar) {
      // 2. Limpiamos los datos guardados (si usas autenticación real)
      localStorage.removeItem('user_token'); 
      localStorage.clear(); // Esto borra todo lo guardado en el navegador

      // 3. Redirigimos al componente de login
      this.router.navigate(['/login']);

      // Opcional: imprimir en consola para debug
      console.log('Sesión finalizada correctamente');
    }
    
  }

  ngOnChanges() {
    console.log('Datos recibidos en el Aside:', this.datosAlumno);
  }
}
