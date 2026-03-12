import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { ProfesorService } from '../../../services/profesor.service';
import { Profesor } from '../../../models/profesor.';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';
import { AulaService } from '../../../services/aula.service';
import { Aula } from '../../../models/aula';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, TitleCasePipe],
  templateUrl: './aula.html',
  styleUrl: './aula.css',
})
export class aulaComponent implements OnInit {
  vista: 'crear' | 'ver' = 'crear';
  busqueda: string = '';

  aulaForm = {
    codigo: '',
    cantidad: 0,
    duracion: '',
    dias: [] as string[],
    id_curso: '',
    id_profesor: '',
    fecha_inicio: '',
    fecha_fin: '',
    linkMeet: '',
    linkClassroom: '',
    hora_inicio: '',
    hora_fin: ''
  };

  listaDiasDefault = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

  profesores: Profesor[] = [];
  cursos: Curso[] = [];
  aulas: any[] = [];

  /** variables de edicion de aula */
  modoEdicion: boolean = false;
  aulaEditandoId: number | null = null;

  onDiaChange(dia: string, event: any) {
    if (event.target.checked) {
      this.aulaForm.dias.push(dia);
    } else {
      this.aulaForm.dias = this.aulaForm.dias.filter(d => d !== dia);
    }
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vista = params['vista'] || 'crear';

      if (this.vista === 'ver') {
            this.listarAulas(); // el método que ya tenés para traer las aulas
        }
    });

    this.listarProfesor();
    this.listarCurso();
    this.listarAulas();
  }

  constructor(private profesorService: ProfesorService, 
              private cursoService: CursoService,
              private aulaService: AulaService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              public router: Router) {


              }

  crearAula() {
    if (this.modoEdicion) {
      this.guardarCambios();
    } else {
      const cursoSeleccionado = this.cursos.find(c => c.id == Number(this.aulaForm.id_curso));
      const profesorSeleccionado = this.profesores.find(p => p.id == Number(this.aulaForm.id_profesor));

      if (!cursoSeleccionado || !profesorSeleccionado || this.aulaForm.dias.length === 0) {
        alert('Por favor seleccione curso, profesor y al menos un día');
        return;
      }

      const dataEnviar: Aula = {
        codigo: this.aulaForm.codigo,
        duracion: this.aulaForm.duracion || "1 hora",
        dias: this.aulaForm.dias,
        cantidad: this.aulaForm.cantidad,
        fecha_inicio: this.aulaForm.fecha_inicio,
        fecha_fin: this.aulaForm.fecha_fin,
        linkMeet: this.aulaForm.linkMeet,
        linkClassroom: this.aulaForm.linkClassroom,
        id_curso: cursoSeleccionado,
        id_profesor: profesorSeleccionado,
        hora_inicio: this.aulaForm.hora_inicio,
        hora_fin: this.aulaForm.hora_fin
      };

      this.aulaService.crearAula(dataEnviar).subscribe({
        next: (res) => {
          alert('¡Aula guardada con éxito!');
          this.resetearFormulario();
          this.listarAulas();
          this.vista = 'ver';
        },
        error: (err) => console.error('Error al guardar:', err)
      });
    }
  }

  resetearFormulario() {
    this.aulaForm = {
      codigo: '',
      cantidad: 0,
      id_curso: "",
      dias: [], // Resetear a arreglo vacío
      duracion: "",
      id_profesor: "",
      fecha_inicio: '',
      fecha_fin: '',
      linkMeet: '',
      linkClassroom: '',
      hora_inicio: '',
      hora_fin: ''
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
      next: (data) => {
        this.aulas = data;
        this.cdr.detectChanges();
      },
      error: (errr) => console.error(errr)
    })
  }

  editarAula(id: number) {
    const aula = this.aulas.find(a => a.id === id);
    if (!aula) return;

    this.aulaEditandoId = id;
    this.modoEdicion = true;

    this.aulaForm = {
      codigo: aula.codigo,
      cantidad: aula.cantidad,
      duracion: aula.duracion,
      dias: [...aula.dias],
      id_curso: aula.id_curso?.id?.toString() || '',
      id_profesor: aula.id_profesor?.id?.toString() || '',
      fecha_inicio: aula.fecha_inicio,
      fecha_fin: aula.fecha_fin,
      linkMeet: aula.meet_link || '',
      linkClassroom: aula.classroom_link || '',
      hora_inicio: aula.hora_inicio,
      hora_fin: aula.hora_fin
    };

    this.vista = 'crear';
  }

  guardarCambios() {
    const cursoSeleccionado = this.cursos.find(c => c.id == Number(this.aulaForm.id_curso));
    const profesorSeleccionado = this.profesores.find(p => p.id == Number(this.aulaForm.id_profesor));

    if(!cursoSeleccionado || !profesorSeleccionado || this.aulaForm.dias.length === 0) {
      alert('Por favor complete todos los campos');
      return;
    }
    const dataEnviar: Aula = {
      codigo: this.aulaForm.codigo,
      duracion: this.aulaForm.duracion,
      dias: this.aulaForm.dias,
      cantidad: this.aulaForm.cantidad,
      fecha_inicio: this.aulaForm.fecha_inicio,
      fecha_fin: this.aulaForm.fecha_fin,
      linkMeet: this.aulaForm.linkMeet,
      linkClassroom: this.aulaForm.linkClassroom,
      id_curso: cursoSeleccionado!,
      id_profesor: profesorSeleccionado!,
      hora_inicio: this.aulaForm.hora_inicio,
      hora_fin: this.aulaForm.hora_fin
    };

    this.aulaService.actualizarAula(this.aulaEditandoId!, dataEnviar).subscribe({
      next: () => {
        alert('¡Aula actualizada con éxito!');
        this.modoEdicion = false;
        this.aulaEditandoId = null;
        this.resetearFormulario();
        this.listarAulas();
        this.vista = 'ver';
      },
      error: (err) => console.error('Error al actualizar:', err)
    });
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.aulaEditandoId = null;
    this.resetearFormulario();
    this.vista = 'ver';
  }

  verIntegrantes(id: number) {
    this.router.navigate(['/portal/aula/', id]);
  }
}