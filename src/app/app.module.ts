import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrganismeListComponent } from './components/organisme-list/organisme-list.component';
import { OrganismeDetailsComponent } from './components/organisme-details/organisme-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// @ts-ignore
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  { path: '', component: OrganismeListComponent },
  { path: 'details/:id', component: OrganismeDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OrganismeListComponent,
    OrganismeDetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    NgChartsModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
