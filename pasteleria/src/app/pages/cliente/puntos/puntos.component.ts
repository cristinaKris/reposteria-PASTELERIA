import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-puntos',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './puntos.component.html',
  styleUrl: './puntos.component.scss'
})
export class PuntosComponent {
  puntosActuales = 235;
  saldoEquivalente = 23.50;
  vigencia = '30/11/2025';

  obtenerCodigo() {
    alert('Código de canje generado: ABC123');
  }
}
