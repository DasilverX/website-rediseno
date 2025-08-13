import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactoComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'servicios', component: ServicesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
  { path: '**', redirectTo: '/home' } // Ruta comodín para páginas no encontradas
];