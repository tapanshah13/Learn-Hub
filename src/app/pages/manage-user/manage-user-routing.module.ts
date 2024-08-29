import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user.component';

const routes: Routes = [{ path: '', component: ManageUserComponent },
{ path: 'edit/:id', component: EditUserComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
