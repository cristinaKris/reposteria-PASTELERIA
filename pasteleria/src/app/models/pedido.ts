import { Time } from "@angular/common";
import { Producto } from "./producto";
import { Item } from "./item";
import { articulo } from "./articulo";

export class Pedido {
    constructor(
        public idPedido : number = 0,
        public usuario: number = 0,
        public fechaEntrega: string = "",
        public horaEntrega: string = "",
        public total: number = 0,
        public tipoEntrega: string = "",
        public formaPago: string = "",
        public status: string = "RECIBIDO",
        public productos: articulo[] = [],
        public calificacion : number = 0,
    ){}
}

