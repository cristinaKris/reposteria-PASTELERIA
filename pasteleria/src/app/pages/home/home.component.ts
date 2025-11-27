
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CarrouselComponent } from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterModule, CarrouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor (private dialog:MatDialog){};
  productosConDescuento: {name: string; description: string; price: number; img:string}[] = [
    { name: "Croissant", description: "Delicioso croissant que muchos llaman la especialidad de la casa.", price: 10, img: "assets/img/croissant.png" },
    { name: "Concha", description: "El clásico pan dulce suave con una costra de azucar encima.", price: 10, img: "assets/img/concha.png" },
    { name: "Trenza", description: "Trenza de pan con azúcar sin relleno.", price: 10, img: "assets/img/trenza.png" },
    { name: "Chocolate Fresas", description: "Pastel húmedo de chocolate cubierto con fresas frescas y ganache intenso.", price: 450, img: "assets/img/pasteles/chocolateFresas.png" },
    { name: "Chocolate Pistache", description: "Pastel de chocolate oscuro con capas de crema de pistache y decoración elegante.", price: 480, img: "assets/img/pasteles/chocolatePistache.png" },
    { name: "Doble Chocolate", description: "Pastel doble capa con chocolate intenso y cobertura espesa estilo gourmet.", price: 470, img: "assets/img/pasteles/dobleChocolate.png" }
  ];

}

