import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageModuleComponent } from './manage-module.component';
import { ModuleAddComponent } from './module-add/module-add.component';


const routes: Routes = [
  {path: '', component: ManageModuleComponent },
  // {path:'manage-module', component: ManageModuleComponent },
  { path: 'module/:add', component: ModuleAddComponent },
  { path: 'module/:edit/:id', component: ModuleAddComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageModuleRoutingModule { }
