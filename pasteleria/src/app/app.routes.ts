import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PersonalizarPastelComponent } from './pages/catalogo/personalizar-pastel/personalizar-pastel.component';
import { MiPerfilComponent } from './pages/cliente/mi-perfil/mi-perfil.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
     { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'catalogo', 
        component: CatalogoComponent,
        children: [
            { path: 'personalizar-pastel', component: PersonalizarPastelComponent }
        ]
    },

    {
     path: 'registro',
     loadComponent: () =>
    import('./pages/cliente/crear-cuenta/crear-cuenta.component').then(
      (m) => m.CrearCuentaComponent
    ),
    },

    { path: 'perfil',
        loadComponent: () =>
    import('./pages/cliente/mi-perfil/mi-perfil.component').then(
      (m) => m.MiPerfilComponent 
    ),
    },

    { path: 'actualizar',
        loadComponent: () =>
    import('./pages/cliente/actualizar-datos/actualizar-datos.component').then(
      (m) => m.ActualizarDatosComponent 
    ),
    },

    { path: 'pedidos',
        loadComponent: () =>
    import('./pages/cliente/mis-pedidos/mis-pedidos.component').then(
      (m) => m.MisPedidosComponent 
    ),
    },

    { path: 'puntos',
        loadComponent: () =>
    import('./pages/cliente/puntos/puntos.component').then(
      (m) => m.PuntosComponent 
    ),
    },
    {path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard]},
    //{ path: 'personalizar-pastel', component: PersonalizarPastelComponent, },
    {path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '/home'}


];
