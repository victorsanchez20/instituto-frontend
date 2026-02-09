import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { ProfesorService } from '../../../services/profesor.service';
import { Profesor } from '../../../models/profesor.';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';
import { AulaService } from '../../../services/aula.service';
import { Aula } from '../../../models/aula';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './aula.html',
  styleUrl: './aula.css',
})
export class aulaComponent implements OnInit {
  vista: 'crear' | 'ver' = 'crear';
  busqueda: string = '';

  aulaForm = {
    codigo: '',
    capacidad: null,
    duracion: '',
    dias: '',
    id_curso: '',
    id_profesor: '' 
  };

  profesores: Profesor[] = [];
  cursos: Curso[] = [];
  aulas: any[] = [];

  ngOnInit(): void {
    this.listarProfesor();
    this.listarCurso();
    this.listarAulas();
  }

  constructor(private profesorService: ProfesorService, 
              private cursoService: CursoService,
              private aulaService: AulaService,
              private cdr: ChangeDetectorRef) {}

  crearAula() {
    const cursoSeleccionado = this.cursos.find(c => c.id == Number(this.aulaForm.id_curso));
    const profesorSeleccionado = this.profesores.find(p => p.id == Number(this.aulaForm.id_profesor));

    if (!cursoSeleccionado || !profesorSeleccionado) {
      alert('Por favor seleccione curso y profesor');
      return;
    }

    // Construimos el objeto para enviar
    // Asegúrate de que tu interfaz Aula use 'id_curso' e 'id_profesor'
    const dataEnviar: Aula = {
      codigo: this.aulaForm.codigo,
      duracion: this.aulaForm.duracion || "1 hora",
      dias: this.aulaForm.dias,
      id_curso: cursoSeleccionado,   
      id_profesor: profesorSeleccionado 
    };

    this.aulaService.crearAula(dataEnviar).subscribe({
      next: (res) => {
        alert('¡Aula guardada con éxito!');
        this.resetearFormulario();
        this.listarAulas(); // Refrescamos la lista
        this.vista = 'ver'; // Cambiamos de pestaña
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Error al guardar: revisa la consola del servidor');
      }
    });
  }

  resetearFormulario() {
    this.aulaForm = {
      codigo: '',
      capacidad: null,
      id_curso: "",
      dias: '',
      duracion: "",
      id_profesor: ""
    };
  }


  aulasFiltradas() {
    // 1. Si la lista de aulas está vacía, devolvemos un arreglo vacío
    if (!this.aulas) return [];

    return this.aulas.filter(a => {
      // 2. Usamos el operador '?' para evitar leer propiedades de undefined
      // y el operador '||' para que si es null, use un texto vacío ""
      const codigo = a.codigo?.toLowerCase() || '';
      const cursoNombre = a.id_curso?.nombre?.toLowerCase() || '';
      const terminoBusqueda = this.busqueda.toLowerCase();

      return codigo.includes(terminoBusqueda) || cursoNombre.includes(terminoBusqueda);
    });
  }

  eliminarAula(id: number) {
    if(confirm('¿Eliminar esta aula?')) {
      this.aulas = this.aulas.filter(a => a.id !== id);
    }
  }

  listarProfesor() {
    this.profesorService.leerProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
        this.cdr.detectChanges();
      },
      error: (error) => console.error(error)
    })
  }

  listarCurso() {
    this.cursoService.listarCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
  }

  listarAulas() {
    this.aulaService.listarAulas().subscribe({
      next: (data) => this.aulas = data,
      error: (errr) => console.error(errr)
    })
  }

}
