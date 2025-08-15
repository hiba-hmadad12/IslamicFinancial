import { Routes } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { HomeComponent } from './components/home/home.component';
import { OrganismeDetailsComponent } from './components/organisme-details/organisme-details.component';
import { AboutComponent } from './components/about/about.component';
   

export const routes: Routes = [
    {path:'' , component: HomeComponent},
    { path: 'graphs', component: GraphsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'organisme-details/:id', component: OrganismeDetailsComponent },
    

];
