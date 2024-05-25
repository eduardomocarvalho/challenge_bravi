// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonCreateComponent } from './person/person-create/person-create.component';

const routes: Routes = [
  { path: 'persons', component: PersonListComponent },
  { path: 'persons/edit/:id', component: PersonEditComponent },
  { path: 'persons/create', component: PersonCreateComponent },
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
