import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Aside } from "./aside/aside";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [Header, Aside, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
