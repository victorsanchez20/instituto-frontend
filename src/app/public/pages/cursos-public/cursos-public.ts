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
      modalidad: 'Virtual / Prácticas Presenciales',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-user-nurse'
    },
    {
      titulo: 'Geriatría',
      descripcion: 'Atención integral del adulto mayor, enfocado en cuidado físico y trato humanizado.',
      duracion: '1 año',
      modalidad: 'Virtual / Prácticas Presenciales',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-hands-helping'
    },
    {
      titulo: 'Cuidado de Adulto Mayor (Extranjero)',
      descripcion: 'Capacitación bajo estándares internacionales para laborar en otros países.',
      duracion: '1 año',
      modalidad: 'Virtual / Prácticas Presenciales',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-plane-departure'
    },
    {
      titulo: 'Paramédico',
      descripcion: 'Atención prehospitalaria, respuesta ante emergencias y soporte vital básico.',
      duracion: '1 año',
      modalidad: 'Virtual / Prácticas Presenciales',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-ambulance'
    },
    {
      titulo: 'Inyectables',
      descripcion: 'Curso práctico sobre administración de inyecciones y normas de bioseguridad.',
      duracion: '3 meses',
      modalidad: 'Virtual / Práctica Presencial',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-syringe'
    },
    {
      titulo: 'Auxiliar en Farmacia',
      descripcion: 'Dispensación de medicamentos, control de inventarios y ética farmacéutica.',
      duracion: '1 año',
      modalidad: 'Virtual / Prácticas Presenciales',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-pills'
    },
    {
      titulo: 'Auxiliar en Nutrición',
      descripcion: 'Apoyo en planes alimentarios y promoción de hábitos saludables.',
      duracion: '1 año',
      modalidad: 'Virtual',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-apple-alt'
    },
    {
      titulo: 'Anatomía',
      descripcion: 'Conocimiento de la estructura y funcionamiento del cuerpo humano.',
      duracion: '6 meses',
      modalidad: 'Virtual',
      precio: 'S/ 110 mensuales',
      icono: 'fas fa-bone'
    }
  ];
}
