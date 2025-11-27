import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Pedido } from '../models/pedido';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getProductos(tipo: string): Observable<Producto[]> {
    const url = this.baseUrl + 'productos/' + tipo + '/';
    return this.http.get<Producto[]>(url);
  }

  loginCliente(correo:string, password:string):Observable<any>{
    const url = this.baseUrl+'login_client/';
    const body = { correo, password };
    return this.http.post<any>(url, body );
  }

  crearPedido(pedido:Pedido):Observable<any>{
    const url = this.baseUrl+'login_client/';
    return this.http.post<any>(url, pedido);
  }

  crearPastel(stock:number, precio:number, extras: number[]):Observable<any>{
    const body = {stock, precio, extras}
    const url = this.baseUrl+'crear_pastelP/';
    return this.http.post<any>(url, body);
  }

  

  getPedidos(idUsuario: number): Observable<Pedido[]> { 
    const url = this.baseUrl + 'get_pedidos/';
    const body = { idUsuario }; // ⚡ aquí usamos la variable local
    // mapeamos la respuesta para devolver solo el arreglo de pedidos
    return this.http.post<{ pedidos: Pedido[] }>(url, body)
  .pipe(
    map((response: { pedidos: Pedido[] }) => response.pedidos)
  ); }

crearUsuario(usuario:   Usuario): Observable<{ success: boolean, message: string, usuario?: Usuario }> {
    return this.http.post<{ success: boolean, message: string, usuario?: Usuario }>(
      `${this.baseUrl}/crear_usuario/`,usuario);
  }

}
