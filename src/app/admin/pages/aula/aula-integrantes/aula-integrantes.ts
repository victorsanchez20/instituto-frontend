import { NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Estudiante } from '../../../../models/estudiante';
import { Estado } from '../../../../models/estado';
import { Profesor } from '../../../../models/profesor.';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { InscripcionService } from '../../../../services/inscripcion.service';
import { EstadoService } from '../../../../services/estado.service';
import { FormsModule } from '@angular/forms';

// Interfaz para dar estructura a tus datos (Mock)
interface FilaEstudiante {
  idInscripcion: number;
  nombres: string;
  email: string;
  estado: string;

   estadoSeleccionado: number;
}

@Component({
  selector: 'app-aula-integrantes',
  standalone: true,
  imports: [NgClass, NgFor, UpperCasePipe, RouterModule, FormsModule],
  templateUrl: './aula-integrantes.html',
  styleUrl: './aula-integrantes.css',
})

export class AulaIntegrantes implements OnInit {

  codigo: String = ''; 
  // Definición de propiedades para evitar error 2339
  profesores: Profesor[] = [];
  estudiantes: FilaEstudiante[] = [];
  estados: Estado[] = [];
  idAula!: number;
  

  constructor(private route: ActivatedRoute,
              private inscripcionService: InscripcionService,
              private cdr: ChangeDetectorRef,
              private estadoService: EstadoService
            ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.idAula = Number(id);

    console.log("ID aula recibido:", this.idAula);

    this.cargarDatosAula(this.idAula);
    
    this.cargarEstados();
  }

  cambiarEstado(estudiante: any): void {

  if (estudiante.estadoSeleccionado === 0) return;

  const nuevoEstadoId = estudiante.estadoSeleccionado;
  const estadoObj = this.estados.find(e => e.id === nuevoEstadoId);

  Swal.fire({
    title: '¿Confirmar cambio?',
    text: `¿Estás seguro de cambiar el estado de ${estudiante.nombres} a "${estadoObj?.nombre}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cambiar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {

    if (result.isConfirmed) {

      // 🔥 AQUÍ LLAMAS AL BACKEND
      this.inscripcionService.actualizarInscripcion(estudiante.idInscripcion, nuevoEstadoId)
        .subscribe({
          next: () => {

            // Actualizamos visualmente la tabla
            estudiante.estado = estadoObj?.nombre.toLowerCase();

            // 👈 resetea el select
            estudiante.estadoSeleccionado = 0;

            Swal.fire('¡Actualizado!', 'El estado ha sido modificado con éxito.', 'success');
            this.cdr.detectChanges();
          },
          error: () => {
            estudiante.estadoSeleccionado = 0;
            Swal.fire('Error', 'No se pudo actualizar.', 'error');
          }
        });

    } else {
      estudiante.estadoSeleccionado = 0;
    }

  });
}

  cargarDatosAula(id: number): void {

    this.inscripcionService.readStudentsEnrolledByIdClassroom(id).subscribe({
      next: (data: any[]) => {

        if (!data || data.length === 0) {
          this.estudiantes = [];
          this.profesores = [];
          return;
        }

        // 🔵 Código del aula (viene en cada fila, usamos el primero)
        this.codigo = data[0].codigoAula;

        // 🔵 Profesor (es el mismo para todos)
        this.profesores = [{
          nombre: data[0].nombreProfesor,
          apellido: data[0].apellidoProfesor,
          email: '' // ← tu DTO no manda email del profesor (puedes agregarlo luego si quieres)
        } as any];

        // 🔵 Estudiantes
        // 🔵 Estudiantes
        this.estudiantes = data.map(i => ({
          idInscripcion: i.idInscripcion,
          nombres: `${i.nombresAlumno} ${i.apellidosAlumno}`,
          email: i.emailAlumno,
          estado: i.estado.toLowerCase(),
          estadoSeleccionado: 0   // 👈 Angular controla el select
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error:', err)
    });

  }

  cargarEstados() {
    this.estadoService.listarEstados().subscribe(data => {
      this.estados = data.filter(e => e.activo);
      this.cdr.detectChanges();
    });
  }

}
