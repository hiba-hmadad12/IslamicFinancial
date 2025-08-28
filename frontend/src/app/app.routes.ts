import { Routes } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { HomeComponent } from './components/home/home.component';
import { OrganismeDetailsComponent } from './components/organisme-details/organisme-details.component';
import { AboutComponent } from './components/about/about.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';




export const routes: Routes = [
    {path:'' , component: HomeComponent},
    { path: 'graphs', component: GraphsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'organisme-details/:id', component: OrganismeDetailsComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },


];
