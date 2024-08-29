import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChapterService } from '../chapter-service/chapter.service';

@Component({
  selector: 'app-chapter-tabling',
  templateUrl: './chapter-tabling.component.html',
  styleUrls: ['./chapter-tabling.component.scss']
})
export class ChapterTablingComponent implements OnInit, AfterViewInit {
  tabvisible = false;
  formType = '';
  gotIndex = 0;
  constructor(private chapterService: ChapterService) {
    this.chapterService.tabVisible.subscribe(result => {
      this.tabvisible = result;
    });
    this.chapterService.enableTabFAQtoQ.subscribe(result => {
      this.tabvisible = false;
    });
    this.chapterService.passTabHeader.subscribe(result => {
      this.formType = result;
      // console.log('header', this.formType);
      if (this.formType === 'Add chapter'){
        this.tabvisible = true;
      }
      else{
        this.tabvisible = false;
      }
    });
    this.chapterService.FromChapterToQuestion.subscribe(result => {
      this.gotIndex = result;
    });
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    // this.chapterService.FromAddQuesToQuesList.subscribe(result => {
    //   this.gotIndex = 1;
    //   console.log(this.gotIndex);
    // });
  }
}
