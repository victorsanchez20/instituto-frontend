import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [NgIf],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class PerfilAdmin implements OnInit {
  admin: any = null;

  ngOnInit(): void {
    const data = localStorage.getItem('adminLogueado');
    if (data) {
      this.admin = JSON.parse(data);
    }
  }
}
