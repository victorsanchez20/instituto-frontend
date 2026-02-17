import { ChangeDetectorRef, Component } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css',
})
export class ListaAlumnos {
estudiantes: Estudiante[] = [];
  busqueda: string = '';

  constructor(private estudianteService: EstudianteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.estudianteService.readAlumno().subscribe({
      next: (data: any) => {
        this.estudiantes = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener estudiantes', err)
    });
  }

  get filtrados() {
    if (!this.busqueda) return this.estudiantes;
    return this.estudiantes.filter(e => 
      e.nombres?.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  eliminar(id?: number) {
    if (id && confirm('¿Deseas dar de baja a este estudiante?')) {
      // Lógica de eliminación aquí
      console.log('Eliminando ID:', id);
    }
  }
}
