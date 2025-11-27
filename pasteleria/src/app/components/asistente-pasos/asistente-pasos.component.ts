import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-asistente-pasos',
  imports: [CommonModule],
  templateUrl: './asistente-pasos.component.html',
  styleUrls: ['./asistente-pasos.component.scss'],
})
export class AsistentePasosComponent {
  @Input() pasos: { valor: number, titulo: string }[] = [];
  @Input() desplazamiento = true; 
  @Input() permitirSiguiente= true; 

  @Input() pasoActual: number = 1;

  @Output() pasoCambiado = new EventEmitter<number>();

  medioPaso=0;

  cambiarPaso(nuevoPaso: number) {
    this.pasoActual = nuevoPaso;
    this.pasoCambiado.emit(this.pasoActual);
  }

  calcularMedioPaso(){
    this.medioPaso = (1 / (this.pasos.length*2 )) * 100;
  }

  calcularProgreso(): number {
    this.calcularMedioPaso();
    if (this.pasos.length <= 1) return 0;
    if (this.pasos.length === 1) return 100;
    if (this.pasoActual ===1) return this.medioPaso;
    return this.medioPaso+(this.medioPaso* (this.pasoActual - 1) * 2);
  }

  siguientePaso(p: number) {
    this.pasoActual = p;
  }
  
  regresarPaso() {
    if (this.pasoActual > 0) {
      this.pasoActual--;
    }
  }
  
  cancelar() {
    this.pasoActual = 0;
  }
   
}
