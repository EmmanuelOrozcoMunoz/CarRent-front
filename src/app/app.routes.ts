import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    loadComponent: () => import('./features/cliente/cliente-list/cliente-list.component').then(m => m.ClienteListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
