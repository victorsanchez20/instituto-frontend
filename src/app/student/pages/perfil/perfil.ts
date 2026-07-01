import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgIf],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  alumno: any = null;

  ngOnInit(): void {
    const data = localStorage.getItem('usuarioLogueado');
    if (data) {
      this.alumno = JSON.parse(data);
    }
  }
}
