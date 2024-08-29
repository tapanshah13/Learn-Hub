import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleAddComponent } from './module-add/module-add.component';
import { ManageModuleComponent } from './manage-module.component';
import { ManageModuleRoutingModule } from './manage-module-routing.module';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { ModuleCreateComponent } from './module-create/module-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipeArrayPipe } from './pipe-array.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ManageModuleComponent,
    ModuleAddComponent,
    CreateChapterComponent,
    DialogboxComponent,
    CreateExamComponent,
    ModuleCreateComponent,
    PipeArrayPipe,

  ],
  imports: [
    CommonModule,
    ManageModuleRoutingModule,
    CKEditorModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    SharedModule,
    DragDropModule,
    TranslateModule
  ]
})
export class ManageModuleModule { }
