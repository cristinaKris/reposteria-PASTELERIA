import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productos: Item[] = [];
  private carritoSubject = new BehaviorSubject<Item[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {}

  agregarProducto(item: Item) {
    const existente = this.productos.find(p => p.id === item.id);
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      this.productos.push(item);
    }
    this.emitirCambios();
  }

  quitarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.emitirCambios();
  }

  actualizarCantidad(id: number, cantidad: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      producto.cantidad = cantidad;
      this.emitirCambios();
    }
  }

  incrementar(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      producto.incrementar();
      this.emitirCambios();
    }
  }

  decrementar(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      producto.decrementar();
      this.emitirCambios();
    }
  }

  vaciarCarrito() {
    this.productos = [];
    this.emitirCambios();
  }

  total(): number {
    return this.productos.reduce((sum, p) => sum + p.getSubtotal(), 0);
  }

  getProductos(): Item[] {
    return [...this.productos];
  }

  private emitirCambios() {
    this.carritoSubject.next([...this.productos]);
    console.log('Carrito actualizado:', this.productos, 'Total:', this.total());
  }
}
