import { Component, OnInit } from '@angular/core';
import { Aside } from './aside/aside';
import { RouterOutlet } from '@angular/router';
import { Estudiante } from '../../models/estudiante';
import { FondoDegradadoComponent } from '../../shared/fondo-degradado/fondo-degradado.component';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [Aside, RouterOutlet, FondoDegradadoComponent],
  templateUrl: './student-layout.html',
  styleUrl: './student-layout.css',
})
export class StudentLayout implements OnInit {

  alumno: Estudiante | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('usuarioLogueado');
    if (data) {
      this.alumno = JSON.parse(data);
      }
    }
}
