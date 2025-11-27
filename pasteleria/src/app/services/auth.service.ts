import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private api:ApiService) {}

  login(username: string, password: string): boolean {
    this.api.loginCliente(username, password).subscribe({
  next: data => {
    console.log('Respuesta del login:', data); 
  },
  error: err => {
    console.error('Error en login:', err);
  }
});

    if (username === 'karen@gmail.com' && password === 'cris123') {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true'); 
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
