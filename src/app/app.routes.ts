import { Routes } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { HomeComponent } from './components/home/home.component';
import { OrganismeDetailsComponent } from './components/organisme-details/organisme-details.component';
   

export const routes: Routes = [
    {path:'' , component: HomeComponent},
    { path: 'graphs', component: GraphsComponent },
    { path: 'organisme-details/:id', component: OrganismeDetailsComponent },
    

];
