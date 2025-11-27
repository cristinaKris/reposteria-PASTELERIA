export class Producto {
    constructor(
        public id: number,
        public precio :number = 0,
        public tipo: string = "",
        public nombre: string = "",
        public descripcion: string = "",
        public img :string = "",
        public cantidad:number = 0
    ){}

    getSubtotal(): number{
        return this.cantidad*this.precio;
    }

    getDescuento(): number{
        return (this.cantidad*this.precio)*0.80;
    }

    incrementar(): void {
      this.cantidad++;
    }

    decrementar(): void {
      if (this.cantidad > 0) this.cantidad--;
    }

}
