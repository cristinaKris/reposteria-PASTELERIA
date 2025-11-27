import { Component, Input } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CarritoService } from '../../services/cart.service';
import { Item } from '../../models/item';


@Component({
  selector: 'app-ventana-producto',
  imports: [],
  templateUrl: './ventana-producto.component.html',
  styleUrl: './ventana-producto.component.scss'
})
export class VentanaProductoComponent {
  //@Input() producto:Producto;
  id : number = 0;
  type: number = 0;
  name:string = "";
  description:string = "";
  price:number = 0.00;
  image:string = "";

  constructor(private carritoService: CarritoService, private dialogRef:MatDialogRef<VentanaProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
      this.name = data.name;
      this.description = data.descripcion;
      this.price = data.price;
      this.image = data.imagen;
    }
  

  // onSubmit(){
  //   this.dialogRef.close({name: this.name, price: this.price, description: this.description, image: this.image});
  // }

  onClose(){
    this.dialogRef.close();
  }

  addToCart() {
    //Sustituir por id de producto para mostrar en carrito
    const item = new Item(this.id, this.name, this.price, 1, this.image);
    this.carritoService.agregarProducto(item);
    console.log(`${this.name} added to cart.`);
    alert("Producto añadido")
  }

}
