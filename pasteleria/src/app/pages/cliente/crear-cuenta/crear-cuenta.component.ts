import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Usuario } from '../../../models/usuario.model';
@Component({
  selector: 'app-crear-cuenta',
  imports: [],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.scss'
})
export class CrearCuentaComponent {
  
  usuario: Usuario = new Usuario() ;
  mensaje: string = '';
  error: string = '';
  

  constructor(private api: ApiService) { }

  crearUsuario() {
    alert("Usuario creado ")
    // this.api.crearUsuario().subscribe(
    //   res => {
    //     if (res.success) {
    //       this.mensaje = res.message;
    //       this.error = '';
    //       console.log('Usuario creado:', res.usuario);
    //     } else {
    //       this.error = res.message;
    //       this.mensaje = '';
    //     }
    //   },
    //   err => {
    //     console.error(err);
    //     this.error = 'Error de conexión con el servidor';
    //     this.mensaje = '';
    //   }
    // );
  }


}