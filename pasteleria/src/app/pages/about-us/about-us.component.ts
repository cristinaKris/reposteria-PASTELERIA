import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, RouterModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
valores = [
    { name: "Calidad artesanal", img: "assets/img/Dibujo1.jpg" },
    { name: "Creatividad", img: "assets/img/Dibujo2.jpg" },
    { name: "Excelencia en sabor", img: "assets/img/Dibujo3.jpg" },
    { name: "Autenticidad", img: "assets/img/Dibujo4.jpg" },
    { name: "Compromiso con el cliente", img: "assets/img/Dibujo5.jpg" }
  ];

  misionText = "Endulzar los momentos más importantes de nuestros clientes mediante la elaboración de pasteles y postres artesanales de alta calidad, combinando ingredientes frescos, técnicas tradicionales y un toque de innovación. En Maison Sucrée buscamos ofrecer una experiencia única y personalizada, reflejando el amor, la creatividad y la dedicación en cada creación.";

  visionText = "Ser reconocidos como una marca líder en la pastelería artesanal, ofreciendo productos de alta calidad, personalizados, innovadores y elaborados con el máximo cuidado y amor para nuestros clientes, creando momentos memorables y deleitando sus sentidos con cada bocado.";

}
