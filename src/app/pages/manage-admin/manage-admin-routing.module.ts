import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageAdminComponent } from './manage-admin.component';

const routes: Routes = [
  { path: '', component: ManageAdminComponent },
  { path: 'manage-admin', component: ManageAdminComponent },
  { path: 'add-admin', component: AddAdminComponent },
  { path: 'edit/:id', component: AddAdminComponent},
  { path: 'profile/changepassword', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAdminRoutingModule { }
