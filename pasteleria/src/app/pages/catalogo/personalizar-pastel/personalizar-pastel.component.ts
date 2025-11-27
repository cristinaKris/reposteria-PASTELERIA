import { Component } from '@angular/core';
import { AsistentePasosComponent } from '../../../components/asistente-pasos/asistente-pasos.component';
import { timeout } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { Pastel } from '../../../models/pastel.model';
import { ApiService } from '../../../services/api.service';
import { CarritoService } from '../../../services/cart.service';
import { Item } from '../../../models/item';
@Component({
  selector: 'app-personalizar-pastel',
  imports: [AsistentePasosComponent, CommonModule],
  templateUrl: './personalizar-pastel.component.html',
  styleUrl: './personalizar-pastel.component.scss'
})
export class PersonalizarPastelComponent {
  constructor(private carritoService: CarritoService, private dialogRef: MatDialogRef<PersonalizarPastelComponent>, private api:ApiService){}
  pastel = new Pastel(
    '',        // size
    '',         // relleno
    '',     // sabor
    ''         // decoracion
  );
  pasos =[
    {valor: 1, titulo:"Tamaño"},
    {valor: 2, titulo:"Sabor"},
    {valor: 3, titulo:"Relleno"},
    {valor: 4, titulo:"Decoración"},
    {valor: 5, titulo: "Resumen"}
  ];
  sizes=["Pequeño", "Mediano", "Grande"];
  sabores=["Chocolate", "Matcha", "Zanahoria","Red velvet","Maracuyá"];
  rellenos=["Crema de cacahuate", "Durazno", "Ganache de chocolate", "Fresas"];
  decoraciones=["Figuras de Fondant", "Mirror Glaze", "Flores naturales comestibles", "Perlas de chocolate"];
  asistente=false;
  idPastel = 0

  imagen:string = "assets/img/decoracion3.png";

  imgP:string = "assets/img/Dibujo4.jpg";
  pasoActual=1;
  cambiarPaso(p: number) {
    this.pasoActual = p;
  }
  onClose(){
    this.pasoActual = 1; 
    this.pastel = undefined as any; 
    this.dialogRef.close();
  }

  size(size:string){
    this.pastel.size=size;
    this.cambiarPaso(2);
  }
  
  sabor(sabor:string){
    this.pastel.sabor = sabor;
    this.cambiarPaso(3);
  }

  relleno(relleno:string){
    this.pastel.relleno=relleno;
    this.cambiarPaso(4);
  }

  decoracion(deco:string){
    this.pastel.decoracion=deco;
    this.cambiarPaso(5);
  }

  finalizar() {
  alert('¡Pedido confirmado!');

  this.api.crearPastel(1, this.pastel.precio, this.pastel.extras).subscribe({
    next: data => {
    console.log('Pastel creado:', data);

    if (data.success) {
      this.idPastel=data.idPastel; // <-- lo guardas globalmente
      const item = new Item(this.idPastel, "Pastel Personalizado", 800, 1, this.imgP);
      this.carritoService.agregarProducto(item);
    }

    this.dialogRef.close();
  },
    error: err => {
      
      console.error('Error al crear pastel:', err);

      alert('Ocurrió un error al crear el pastel. Intenta de nuevo.');
    }
  });

}


}
