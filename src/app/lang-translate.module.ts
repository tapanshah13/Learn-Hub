import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';

// tslint:disable-next-line: typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
      {prefix: './assets/translate/layout/header/', suffix: '.json'},
      {prefix: './assets/translate/home/', suffix: '.json'},
      {prefix: './assets/translate/pages/dashboard/', suffix: '.json'},
      {prefix: './assets/translate/pages/admin/', suffix: '.json'},
      {prefix: './assets/translate/pages/add_admin/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-chapter/add-chapter/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-chapter/chapter-list/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-chapter/Question/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-chapter/view-chapter/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-chapter/add-question/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-module/create-module/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-module/create-chapter/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-module/create-exam/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-module/module-list/', suffix: '.json'},
      {prefix: './assets/translate/pages/manage-course/course-list/', suffix: '.json'},
  ]);
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  exports: [
    HttpClientModule,
    TranslateModule
  ]
})
export class LangTranslateModule { }
