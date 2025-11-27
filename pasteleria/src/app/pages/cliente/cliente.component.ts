import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  @Input() isOpen: boolean = false;   // ← necesario para el modal global
  @Output() close = new EventEmitter<void>(); // ← necesario para cerrar desde afuera
  
  // NUEVO → controlar si el usuario está logeado
  @Input() isLoggedIn: boolean = false;

  // NUEVO → notificar cuando se cierre sesión
  @Output() logout = new EventEmitter<void>();

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  closeModal() {
    this.close.emit(); // ← Notifica al app.component.html que debe cerrar
  }

  constructor(private router: Router, private auth: AuthService) {}

  irCrearCuenta() {
    this.closeModal();
    this.router.navigate(['/registro']);
  }

  cerrarSesion() {
    this.isLoggedIn = false;
    this.logout.emit();   // avisar al componente padre
  }

  login() {
    if (this.auth.login(this.username, this.password)) {
      this.errorMessage = '';
      //this.router.navigate(['/dashboard']); // redirige al dashboard
      this.isLoggedIn = true;
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
      const confirmacion = window.confirm(' Usuario o contraseña incorrecta');
    }

  }
  logoutt() {
    this.auth.logout();
    this.router.navigate(['/cliente']);
  }

}


