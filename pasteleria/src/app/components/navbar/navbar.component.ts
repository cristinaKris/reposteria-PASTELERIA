import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() openCliente = new EventEmitter<void>();

  abrirCliente() {
    this.openCliente.emit();
  }
}
