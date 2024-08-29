import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'manage-admin', loadChildren: () => import('./pages/manage-admin/manage-admin.module').then(m => m.ManageAdminModule)
  },
  {
    path: 'manage-module', loadChildren: () => import('./pages/manage-module/manage-module.module').then(m => m.ManageModuleModule)
  },
  {
    path: 'manage-course', loadChildren: () => import('./pages/manage-course/manage-course.module').then(m => m.ManageCourseModule)
  },
  {
    path: 'manage-chapter', loadChildren: () => import('./pages/manage-chapter/manage-chapter.module').then(m => m.ManageChapterModule)
  },
  {
    path: 'manage-user', loadChildren: () => import('./pages/manage-user/manage-user.module').then(m => m.ManageUserModule)
  },
  {
    path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  // { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
