import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../../services/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  menuOpen$!: Observable<boolean>;

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit() {
    this.menuOpen$ = this.menuService.menuOpen$;
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

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
}
