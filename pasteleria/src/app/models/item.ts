export class Item {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number,
        public cantidad: number,
        public img: string,
    ){}
    getSubtotal(): number{
        return this.cantidad*this.precio;
    }

    incrementar(): void {
    this.cantidad++;
  }

  decrementar(): void {
    if (this.cantidad > 0) this.cantidad--;
  }
}
