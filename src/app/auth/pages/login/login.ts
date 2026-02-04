import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usernameCorrecto: string = "admin";
  passwordCorrecta: string = "12345";

  user: string = '';
  pass: String = '';

  constructor( private router: Router) {}

  validarUsuario() {
    if (this.user === this.usernameCorrecto && this.pass === this.passwordCorrecta) {
      this.router.navigate(['/portal']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
} 
