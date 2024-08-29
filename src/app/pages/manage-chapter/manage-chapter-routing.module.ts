import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddQuestionComponent} from './add-question/add-question.component';
import { ChapterTablingComponent } from './chapter-tabling/chapter-tabling.component';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ManageChapterComponent } from './manage-chapter.component';
import { ChapterQuestionsComponent } from './chapter-questions/chapter-questions.component';
import { ViewChapterComponent } from './view-chapter/view-chapter.component';

const routes: Routes = [{ path: '', component: ManageChapterComponent, children: [
  {path: '', component: ChapterListComponent},
  {path: 'add', component: ChapterTablingComponent},
  {path: 'edit/:id', component: ChapterTablingComponent},
  {path: 'chapterQuestion/:add/:id', component: AddQuestionComponent},
  {path: 'chapterQuestion/edit/:quesId/:id', component: AddQuestionComponent},
  {path: 'viewchapter/:id', component: ViewChapterComponent},
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageChapterRoutingModule { }
