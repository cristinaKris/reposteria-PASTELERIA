export class Pastel {
    constructor(
        //public id: 0,
        public size:string,
        public relleno:string,
        public sabor:string,
        public decoracion:string,
        
        public stock:number = 1,
        public extras=[],
        public precio:number = 0,

    ){
    }

}
