import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { ManageCourseComponent } from './manage-course.component';

const routes: Routes = [
  { path: '', component: ManageCourseComponent },
  { path: 'course/:add', component: AddCourseComponent },
  { path: 'edit/:id', component: AddCourseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCourseRoutingModule { }
