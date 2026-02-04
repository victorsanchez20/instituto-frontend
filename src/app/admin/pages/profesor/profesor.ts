import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profesor',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './profesor.html',
  styleUrl: './profesor.css',
})
export class Profesor {

  vista: 'crear' | 'ver' = 'crear';

  profesor = {
    nombre: '',
    apellido: '',
    especialidad: ''
  };

  profesores: any[] = [];
  busqueda: string = '';

  crearProfesor() {
    this.profesores.push({ ...this.profesor });

    this.profesor = {
      nombre: '',
      apellido: '',
      especialidad: ''
    };

    this.vista = 'ver';
  }

  profesoresFiltrados() {
    return this.profesores.filter(p =>
      (`${p.nombre} ${p.apellido}`)
        .toLowerCase()
        .includes(this.busqueda.toLowerCase())
    );
  }

}
