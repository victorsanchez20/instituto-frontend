import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aula',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './aula.html',
  styleUrl: './aula.css',
})
export class Aula {
  vista: 'crear' | 'ver' = 'crear';

  aula = {
    nombre: '',
    capacidad: 0,
    ubicacion: ''
  };

  aulas: any[] = [];
  busqueda: string = '';

    crearAula() {
      this.aulas.push({ ...this.aula });

    this.aula = {
      nombre: '',
      capacidad: 0,
      ubicacion: ''
    };

    this.vista = 'ver';
  }

  aulasFiltradas() {
    return this.aulas.filter(a =>
      a.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

}
