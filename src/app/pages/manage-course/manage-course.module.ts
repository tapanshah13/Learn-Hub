import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { ManageCourseRoutingModule } from './manage-course-routing.module';
import { ManageCourseComponent } from './manage-course.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourseExamComponent } from './course-exam/course-exam.component';
import { PreRequisiteCoursesComponent } from './pre-requisite-courses/pre-requisite-courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AddCourseComponent } from './add-course/add-course.component';
import { ArrayFromNumberPipe } from './array-from-number.pipe';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseModuleComponent } from './course-module/course-module.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ManageCourseComponent,
    CourseExamComponent,
    PreRequisiteCoursesComponent,
    AddCourseComponent,
    ArrayFromNumberPipe,
    CourseDetailComponent,
    CourseModuleComponent,
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    ManageCourseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    SharedModule,
    ToastrModule.forRoot(),
    TranslateModule
  ],
  providers: [
    {provide: ToastrService, useClass: ToastrService},
    MaterialModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManageCourseModule { }
