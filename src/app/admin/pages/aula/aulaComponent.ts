import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
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
  imports: [FormsModule, NgIf, NgFor, DatePipe],
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
    dias: [] as string[], // Cambiado de '' a []
    id_curso: '',
    id_profesor: '',
    fecha_inicio: '', // Agregados porque son obligatorios en tu backend
    fecha_fin: ''
  };

  listaDiasDefault = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

  profesores: Profesor[] = [];
  cursos: Curso[] = [];
  aulas: any[] = [];

  onDiaChange(dia: string, event: any) {
    if (event.target.checked) {
      this.aulaForm.dias.push(dia);
    } else {
      this.aulaForm.dias = this.aulaForm.dias.filter(d => d !== dia);
    }
  }


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

    if (!cursoSeleccionado || !profesorSeleccionado || this.aulaForm.dias.length === 0) {
      alert('Por favor seleccione curso, profesor y al menos un día');
      return;
    }

    const dataEnviar: Aula = {
      codigo: this.aulaForm.codigo,
      duracion: this.aulaForm.duracion || "1 hora",
      dias: this.aulaForm.dias, // Ahora sí coinciden los tipos (arreglo con arreglo)
      cantidad: this.aulaForm.cantidad,
      fecha_inicio: this.aulaForm.fecha_inicio,
      fecha_fin: this.aulaForm.fecha_fin,
      id_curso: cursoSeleccionado,
      id_profesor: profesorSeleccionado
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

  resetearFormulario() {
    this.aulaForm = {
      codigo: '',
      cantidad: 0,
      id_curso: "",
      dias: [], // Resetear a arreglo vacío
      duracion: "",
      id_profesor: "",
      fecha_inicio: '',
      fecha_fin: ''
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
