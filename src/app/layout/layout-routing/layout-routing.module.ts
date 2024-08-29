import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AddAdminComponent } from 'src/app/pages/manage-admin/add-admin/add-admin.component';
import { ManageAdminComponent } from 'src/app/pages/manage-admin/manage-admin.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manage-admin', loadChildren: () => import('src/app/pages/manage-admin/manage-admin.module').then(m => m.ManageAdminModule) },
  { path: 'manage-module', loadChildren: () => import('src/app/pages/manage-module/manage-module.module').then(m => m.ManageModuleModule) },
  { path: 'course', loadChildren: () => import('src/app/pages/manage-course/manage-course.module').then(m => m.ManageCourseModule) },
  { path: 'manage-chapter', loadChildren: () => import('src/app/pages/manage-chapter/manage-chapter.module').then(m => m.ManageChapterModule) },
  { path: 'manage-user', loadChildren: () => import('src/app/pages/manage-user/manage-user.module').then(m => m.ManageUserModule) },
  { path: 'dashboard', loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'add-admin', component: AddAdminComponent },
  { path: 'edit-admin/', component: AddAdminComponent  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
