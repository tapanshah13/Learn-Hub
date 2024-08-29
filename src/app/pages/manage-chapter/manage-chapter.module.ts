import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageChapterRoutingModule } from './manage-chapter-routing.module';
import { ManageChapterComponent } from './manage-chapter.component';
import { HttpClientModule } from '@angular/common/http';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatTabsModule } from '@angular/material/tabs';
import { ChapterTablingComponent } from './chapter-tabling/chapter-tabling.component';
import { ChapterQuestionsComponent } from './chapter-questions/chapter-questions.component';
import { ViewChapterComponent } from './view-chapter/view-chapter.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [
    ManageChapterComponent,
    AddChapterComponent,
    ChapterListComponent,
    ChapterTablingComponent,
    ChapterQuestionsComponent,
    ViewChapterComponent,
    AddQuestionComponent,
  ],
  imports: [
    CommonModule,
    ManageChapterRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    MatTooltipModule,
    MatTabsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ManageChapterModule { }
