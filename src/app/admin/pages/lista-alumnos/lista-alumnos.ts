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
  paginaActual: number = 1;
  readonly porPagina: number = 7;
  listaFiltrada: Estudiante[] = [];


  constructor(private estudianteService: EstudianteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.estudianteService.readAlumno().subscribe({
      next: (data: any) => {
        this.estudiantes = data;
        this.actualizarLista();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener estudiantes', err)
    });
  }

  actualizarLista() {
    this.listaFiltrada = !this.busqueda
      ? [...this.estudiantes]
      : this.estudiantes.filter(e =>
          e.nombres?.toLowerCase().includes(this.busqueda.toLowerCase())
      );
      this.paginaActual = 1;
  }

  get filtrados() {
    if (!this.busqueda) return this.estudiantes;
    return this.estudiantes.filter(e => 
      e.nombres?.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  get paginados() {
    const inicio = (this.paginaActual - 1) * this.porPagina;
    return this.listaFiltrada.slice(inicio, inicio + this.porPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.listaFiltrada.length / this.porPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  onBusquedaChange() {
    this.actualizarLista();
  }

  eliminar(id?: number) {
    if (id && confirm('¿Deseas dar de baja a este estudiante?')) {
      // Lógica de eliminación aquí
      console.log('Eliminando ID:', id);
    }
  }
}
