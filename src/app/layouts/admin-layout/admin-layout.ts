import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Aside } from "./aside/aside";
import { RouterOutlet } from '@angular/router';
import { FondoDegradadoComponent } from '../../shared/fondo-degradado/fondo-degradado.component';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [Header, Aside, RouterOutlet, FondoDegradadoComponent],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
