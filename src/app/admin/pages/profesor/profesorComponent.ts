import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profesor } from '../../../models/profesor.';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
  selector: 'app-profesor',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './profesor.html',
  styleUrl: './profesor.css',
})
export class ProfesorComponent implements OnInit {

  vista: 'crear' | 'ver' = 'crear';

  profesores: Profesor[] = [];
  busqueda: string = '';

  profesor: Profesor = {
    nombre: '',
    apellido: '',
    docidentidad: '',
    telefono: '',
    especialidad: '',
    email: '',
    usuario: '',
    password: ''
  };

  ngOnInit(): void {
      this.cargarProfesores();
  }

  constructor(private profesorService: ProfesorService,
              private cdr: ChangeDetectorRef
  ) {}

  crearProfesor() {
    const nuevoProfesor: Profesor = this.profesor;
    this.profesorService.saveProfesor(nuevoProfesor).subscribe({
      next: () => {
        alert('✔ Profesor registrado correctamente.');
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar profesor.')
      }
    })

    this.vista = 'ver';
  }

  cargarProfesores() {
  this.profesorService.leerProfesores().subscribe({
    next: (data: Profesor[]) => {
      this.profesores = data;
      console.log(data);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
      alert('Error al leer profesores.');
    }
  });
}

  profesoresFiltrados(): Profesor[] {
    return this.profesores.filter(p =>
      `${p.nombre} ${p.apellido}`
        .toLowerCase()
        .includes(this.busqueda.toLowerCase())
    );
  }

  eliminarProfesor(id: any) {
    if (confirm("¿Estas seguro de eliminar este profesor?")) {
      this.profesorService.eliminarProfesor(id).subscribe({
        next: () => {
          alert('Profesor eliminado.')
          this.cargarProfesores();
        },
        error: (err) => {
          console.error(err);
          alert('No se puedo eliminar al profesor.')
        }
      })
    }
    this.cdr.detectChanges();
  }

}
