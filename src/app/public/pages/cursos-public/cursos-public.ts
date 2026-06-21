import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cursos-public',
  imports: [NgFor],
  templateUrl: './cursos-public.html',
  styleUrl: './cursos-public.css',
})
export class CursosPublic {
cursos = [
    {
      titulo: 'Auxiliar de Enfermería',
      descripcion: 'Formación integral para el apoyo en atención al paciente, bioseguridad y ética.',
      duracion: '1 año',
      imagen: 'https://ineforma.com/wp-content/smush-webp/2025/07/Funciones-de-un-auxiliar-de-enfermeria-1024x683.jpg.webp',
      modalidad: 'Virtual / Prácticas Presenciales',
      icono: 'fas fa-user-nurse'
    },
    {
      titulo: 'Geriatría',
      descripcion: 'Atención integral del adulto mayor, enfocado en cuidado físico y trato humanizado.',
      duracion: '1 año',
      imagen: 'https://www.segg.es/media/noticias/827/Abu.jpg',
      modalidad: 'Virtual / Prácticas Presenciales',
      icono: 'fas fa-hands-helping'
    },
    {
      titulo: 'Cuidado de Adulto Mayor (Extranjero)',
      descripcion: 'Capacitación bajo estándares internacionales para laborar en otros países.',
      duracion: '1 año',
      imagen: 'https://peru.unir.net/wp-content/uploads/sites/2/2025/04/Cuales-son-los-cuidados-de-enfermeria-en-el-adulto-mayor.jpgwa',
      modalidad: 'Virtual / Prácticas Presenciales',
      icono: 'fas fa-plane-departure'
    },
    {
      titulo: 'Paramédico',
      descripcion: 'Atención prehospitalaria, respuesta ante emergencias y soporte vital básico.',
      duracion: '1 año',
      imagen: 'https://d2qbblo43j0vwz.cloudfront.net/wp-content/uploads/2025/07/que-hace-un-paramedico.webp',
      modalidad: 'Virtual / Prácticas Presenciales',
      icono: 'fas fa-ambulance'
    },
    {
      titulo: 'Inyectables',
      descripcion: 'Curso práctico sobre administración de inyecciones y normas de bioseguridad.',
      duracion: '3 meses',
      imagen: 'https://iccecapacita.cl/wp-content/uploads/2025/05/xxx.jpg',
      modalidad: 'Virtual / Práctica Presencial',
      icono: 'fas fa-syringe'
    },
    {
      titulo: 'Auxiliar en Farmacia',
      descripcion: 'Dispensación de medicamentos, control de inventarios y ética farmacéutica.',
      duracion: '1 año',
      imagen: 'https://www.campustraining.es/wp-content/uploads/2021/06/funciones-auxiliar-de-farmacia.jpg',
      modalidad: 'Virtual / Prácticas Presenciales',
      icono: 'fas fa-pills'
    },
    {
      titulo: 'Auxiliar en Nutrición',
      descripcion: 'Apoyo en planes alimentarios y promoción de hábitos saludables.',
      duracion: '1 año',
      imagen: 'https://usil-blog.s3.amazonaws.com/PROD/blog/image/como-postular-nutricion-dietetica-usil-proceso-admision-paso-paso.jpg',
      modalidad: 'Virtual',
      icono: 'fas fa-apple-alt'
    },
    {
      titulo: 'Anatomía',
      descripcion: 'Conocimiento de la estructura y funcionamiento del cuerpo humano.',
      duracion: '6 meses',
      imagen: 'https://imagenes.elpais.com/resizer/v2/JTTGW7PJUQCGU5VUJE5RFC7SJQ.jpg?auth=df74cb1cb851bc9e57ff925d147f9d2768edd10d095011d2636ecd26b257be84&width=1200',
      modalidad: 'Virtual',
      icono: 'fas fa-bone'
    }
  ];
}
