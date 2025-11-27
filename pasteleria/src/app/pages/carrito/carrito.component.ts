import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistentePasosComponent } from '../../components/asistente-pasos/asistente-pasos.component';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../models/pedido';
import {Producto}  from '../../models/producto';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { Item } from '../../models/item';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketComponent } from '../../components/ticket/ticket.component';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule,AsistentePasosComponent, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {
  productosI: Item[] = [];
  total: number = 0;
  pedido = new Pedido();

  constructor(private router: Router, private auth: AuthService, private carritoService: CarritoService, private dialog:MatDialog,
    private api: ApiService) {}
  login=false;
  ngOnInit(){
    this.login=this.auth.isLoggedIn();
    console.log(this.login)
    if(this.login==false){this.router.navigate(['/cliente']);}

    this.carritoService.carrito$.subscribe(items => {
      this.productosI = items;    
      this.total = this.carritoService.total(); 
  });
  }




  // productosList = [
  //   { 
  //     id: 1,
  //     nombre: 'Tarta de Kiwi', 
  //     precio: 10.99, 
  //     cantidad: 1,
  //     imagen: "assets/img/tartas/tartaKiwi.png"
  //   },
  //   { id : 2,
  //     nombre: 'Concha Bicolor', 
  //     precio: 8.50, 
  //     cantidad: 1,
  //     imagen: 'assets/img/panes/conchaBicolor.jpg'
  //   },
  //   { 
  //     id : 3,
  //     nombre: 'Pastel de Doble Chocolate', 
  //     precio: 12.00, 
  //     cantidad: 1,
  //     imagen: 'assets/img/pasteles/dobleChocolate.png'
  //   },
  //   { 
  //     id : 4,
  //     nombre: 'Pan de frambuesa', 
  //     precio: 9.25, 
  //     cantidad: 1,
  //     imagen: 'assets/img/panes/frambuesa.jpg'
  //   },
  //   { 
  //     id : 5,
  //     nombre: 'Tarta navideña edición 2', 
  //     precio: 11.50, 
  //     cantidad: 1,
  //     imagen: 'assets/img/tartas/navideña2.jpg'
  //   }
  // ];

  // productos: Producto[] = this.productosList.map(p =>
  //   new Producto(p.id,p.pre, "", p.nombre, '', p.precio, p.imagen, p.cantidad)
  // );
  productos : Producto[] = [];
  getProductos(){
  this.api.getProductos("PAN").subscribe(
    data => {
      this.productos = data;
    },
  error => {
    console.error();

  }
)
  };

  

  //Par esto quiero un objeto que tenga un arreglod e productos que tenga el nombr,
  // precio, descripción, id, imagen, cantidad y subtotal, además recibe el total. (o no)
  //enviamos una entidad llamada 


  mostrarProductos=true;
  eleccionMP = false;
  eleccionPickUp = false;
  eleccionDomicilio = false;
  eleccionPaypal = false;
  direccionEntrega="direccion para enviar";
  pasoActual = 1;
  pasos = [
    { valor: 1, titulo: 'Agendar pedido' },
    { valor: 2, titulo: 'Forma de entrega' },
    { valor: 3, titulo: 'Forma de pago' },
    { valor: 4, titulo: 'Resumen' },
    { valor: 5, titulo: 'Seguimiento'}
  ];

  status = [
    'Pedido recibido',
    'En proceso de elaboración',
    'Listo para la entrega',
    'Enviado',
    'Entregado'
  ];

  statusActivo = 3; // índice del paso actual (0-based)

  cambiarPaso(p: number) {
    this.pasoActual = p;
  }
  
  //total: number = 0;

  // eliminar(id : number){
  //   this.productos = this.productos.filter(p => p.id !== id);
  //   //window.location.reload();
  // }
  // calculaTotal(){
  //   let total = 0;
  //   for (let p of this.productos){
  //     total += p.precio * p.cantidad;
  //   }
  //   //this.total = Number(total.toFixed(2));  
  //   console.log(this.pedido);
  //   return Number(total.toFixed(2));  
  // }

  
  iniciarPago(){
    //this.pedido.productos=this.productos;
    this.mostrarProductos=false;
    this.pasoActual=1;
  }

  

  guardar(form: any) {
    //console.log('Datos enviados:', this.datos);
    console.log('Estado del formulario:', form);
    this.cambiarPaso(2);
    console.log(this.pedido);
  }

  pickUp(){
    this.cambiarPaso(3);
    this.eleccionPickUp=true;
    this.pedido.tipoEntrega="Pickup";
    console.log(this.pedido);
  }

  domicilio(){
    this.cambiarPaso(3)
    this.eleccionDomicilio=true;
    this.pedido.tipoEntrega="Domicilio";
    console.log(this.pedido);
  }
  paypal(){
    this.pedido.formaPago="Paypal";
    console.log(this.pedido);
    this.eleccionPaypal=true;
  }

  mercadoPago(){
    this.pedido.formaPago="MercadoPago";
    console.log(this.pedido);
    this.eleccionMP=true;
  }
  pagarPaypal(datosCliente: any) {
    console.log("Datos enviados a PayPal:", datosCliente);
    this.cambiarPaso(4);
    console.log(this.pedido);
    // Aquí llamas a tu backend para crear la orden de PayPal
    // this.apiService.crearOrdenPaypal(datosCliente).subscribe(...)
  }

  pagarMP(datosCliente: any) {
    console.log("Datos enviados a MercadoPago:", datosCliente);
    this.cambiarPaso(4);
    console.log(this.pedido);
    // Aquí llamas a tu backend para crear la preferencia de MercadoPago
    // this.apiService.crearPreferenciaMP(datosCliente).subscribe(...)
  }

  confirmar() {
  this.cambiarPaso(5);
  console.log(this.pedido);
  this.actualizarPasoActivo();

  this.api.crearPedido(this.pedido).subscribe({
    next: data => {
      console.log('Pedido creado:', data); // lo que devuelve el backend
      // aquí puedes agregar más lógica si quieres, como redireccionar
    },
    error: err => {
      console.error('Error al crear pedido:', err);
    }
  });
}

  
  actualizarPasoActivo() {
    this.pedido.status = "Pedido recibido";
    this.statusActivo = this.status.indexOf(this.pedido.status);
  }
  eliminar(id: number) {
  const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este producto del carrito?');
  if (confirmacion) {
    this.carritoService.quitarProducto(id);
  }
}

incrementar(item: Item) {
  this.carritoService.incrementar(item.id);
}

decrementar(item: Item) {
  this.carritoService.decrementar(item.id);
}
  vaciar() {
    this.carritoService.vaciarCarrito();
  }

// finalizar() {
//   this.productosI = [];
//   this.total = 0;
//   this.pedido = new Pedido();

//   // Navegar a /home correctamente
//   this.router.navigate(['/home']);
// }
finalizar() {
  

  // limpiar carrito
  this.productosI = [];
  this.total = 0;
  this.pedido = new Pedido();
  this.carritoService.vaciarCarrito();
  this.router.navigate(['/home']);
}

descuento(){
  this.pedido.total=this.pedido.total*0.80;
}




}
