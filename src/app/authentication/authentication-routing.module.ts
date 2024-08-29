import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dahsboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, data: { isLoggedIn: false}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
