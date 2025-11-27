import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
export interface Pedido {
  folio: string;
  status: string;
  descripcion: string;
  fechaEntrega: string;
  formaEntrega: string;
  rating: number;
}

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.scss']
})
export class MisPedidosComponent {

  pedidos: Pedido[] = [
    {
      folio: '0001',
      status: 'ENTREGADO',
      descripcion: 'Pastel chocolate 1kg',
      fechaEntrega: '2025-01-10',
      formaEntrega: 'PICK UP',
      rating: 5
    },
    {
      folio: '0002',
      status: 'ENVIADO',
      descripcion: 'Macarons surtidos',
      fechaEntrega: '2025-01-15',
      formaEntrega: 'DOMICILIO',
      rating: 0
    },
    {
      folio: '0003',
      status: 'CANCELADO',
      descripcion: 'Panqué de limón',
      fechaEntrega: '-',
      formaEntrega: '-',
      rating: 0
    }
  ];

  calificar(pedido: Pedido, estrellas: number) {
    if (pedido.status === 'ENTREGADO') {
      pedido.rating = estrellas;
    }
  }
}
