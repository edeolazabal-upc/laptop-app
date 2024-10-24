import { bootstrapApplication } from '@angular/platform-browser';

import { importProvidersFrom } from '@angular/core';
import { ListLaptopComponent } from './app/component/list-laptop/list-laptop.component';
import { EditLaptopComponent } from './app/component/edit-laptop/edit-laptop.component';
import { NavbarComponent } from './app/component/navbar/navbar.component';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app/app.component';


export const routes: Routes = [
  {path:'', redirectTo: '/list', pathMatch: 'full'},
  {path:'list', component: ListLaptopComponent},
  {path:'add', component: EditLaptopComponent},
  {path:'edit/:id', component: EditLaptopComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, RouterModule, MatToolbarModule),
    provideAnimations(),
  ]
});
