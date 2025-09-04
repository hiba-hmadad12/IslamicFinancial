import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'organisme-details/:id', loadComponent: () => import('./components/organisme-details/organisme-details.component').then(m => m.OrganismeDetailsComponent), canActivate: [authGuard] },

  { path: 'sign-in', loadComponent: () => import('./components/auth/sign-in/sign-in.component').then(m => m.SignInComponent) },
  { path: 'sign-up', loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(m => m.SignUpComponent) },

  // 👇 protégé: nécessite être connecté
  { path: 'graphs', canActivate: [authGuard], loadComponent: () => import('./components/graphs/graphs.component').then(m => m.GraphsComponent) },

  // 👇 admin only
  {
    path: 'companies/new',
    canActivate: [adminGuard],
    loadComponent: () => import('./components/add-company/add-company.component').then(m => m.AddCompanyComponent)
  },

  { path: '**', redirectTo: '' }
];
