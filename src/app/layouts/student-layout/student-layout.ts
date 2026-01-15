import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Aside } from "./aside/aside";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [Header, Aside, RouterOutlet],
  templateUrl: './student-layout.html',
  styleUrl: './student-layout.css',
})
export class StudentLayout {}
