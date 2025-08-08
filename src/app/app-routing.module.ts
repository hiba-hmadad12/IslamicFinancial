import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GraphsComponent } from './components/graphs/graphs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'graphs', component: GraphsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
