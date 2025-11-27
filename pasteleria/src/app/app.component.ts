import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ClienteComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pasteleria';


  isClienteModalOpen = false;

  // Control de login global
  isLoggedIn = false;

  // Abre modal cuando Navbar lo manda
  abrirModalCliente() {
    console.log("NAVBAR SI EMITIÓ EL EVENTO");
    this.isClienteModalOpen = true;
    
  }

  // Cierra modal cuando ClienteComponent emite close()
  closeClienteModal() {
    this.isClienteModalOpen = false;
  }

  // Cliente cerró sesión
  logoutCliente() {
    this.isLoggedIn = false;
  }

}
