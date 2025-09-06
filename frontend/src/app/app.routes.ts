import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { authMatchGuard } from './guards/auth-match.guard';

export const routes: Routes = [
  // PUBLIC
  { path: '',      loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'sign-in', loadComponent: () => import('./components/auth/sign-in/sign-in.component').then(m => m.SignInComponent) },
  { path: 'sign-up', loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(m => m.SignUpComponent) },

  // PROTÉGÉ
  {
    path: 'organisme-details/:id',
    canMatch:    [authMatchGuard],
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/organisme-details/organisme-details.component')
        .then(m => m.OrganismeDetailsComponent)
  },
  {
    path: 'graphs',
    canMatch:    [authMatchGuard],
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/graphs/graphs.component')
        .then(m => m.GraphsComponent)
  },

  // ADMIN
  {
    path: 'companies/new',
    canMatch:    [authMatchGuard],
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./components/add-company/add-company.component')
        .then(m => m.AddCompanyComponent)
  },

  { path: '**', redirectTo: '' }
];
