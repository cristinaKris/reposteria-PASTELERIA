import { Component, Input } from '@angular/core';
import{MatDialog} from '@angular/material/dialog';
import { VentanaProductoComponent } from '../ventana-producto/ventana-producto.component';
import { CarritoService } from '../../services/cart.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() id: number = 0;
  @Input() imagen:string = "assets/img/tartaKiwi.png";
  @Input() name:string = "Producto Ejemplo";
  @Input() descripcion:string = "Descripción del producto ejemplo.";
  @Input() price:number = 9.99;
  @Input() type:number = 0;

  productosI: Item[] = [];

  constructor(private dialogRef: MatDialog, private carritoService: CarritoService ){}
  ngOnInit(){
      this.carritoService.carrito$.subscribe(items => {
      this.productosI = items;
    });
  }
  //VentanaProductoComponent
  seeProduct(){
    const dialogRef = this.dialogRef.open(VentanaProductoComponent,{
      width: '600px',
      height: '700px',
      data: {
        id : this.id,
        type : this.type,
        imagen: this.imagen,
        name: this.name,
        descripcion: this.descripcion,
        price: this.price
      },
      disableClose: false,
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addToCart();      
      }
    });

  }

  addToCart() {
    //Sustituir por id de producto para mostrar en carrito
    const item = new Item(this.id, this.name, this.price, 1, this.imagen);
    this.carritoService.agregarProducto(item);
    console.log(`${this.name} added to cart.`);
    alert("Producto agregado")
  }

}
