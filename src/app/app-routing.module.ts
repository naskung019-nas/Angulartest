import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistTableComponent } from './component/page/checklist-table/checklist-table.component';
import {LoginComponent } from './component/page/login/login.component';
import { RegisterComponent } from './component/page/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'checklist-table', component: ChecklistTableComponent } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
