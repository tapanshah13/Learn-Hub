import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChapterService } from '../chapter-service/chapter.service';

@Component({
  selector: 'app-view-chapter',
  templateUrl: './view-chapter.component.html',
  styleUrls: ['./view-chapter.component.scss']
})
export class ViewChapterComponent implements OnInit {
  chapterDetail: any = [];
  questionDetail: any = [];
  GenUrl: any;
  audioUrl: any;
  videoUrl: any;
  pdfUrl: any;
  TextUrl: any;
  option: any;

  imgVisible = false;
  audioVisible = false;
  vidioWithUrl = true;
  videoVisible = false;
  pdfVisible = false;
  textVisible = false;

  flag: any;
  details: any = [];
  singleanswer: any = [];
  multianswer: any = [];
  truefalseanswer: any = [];
  dragdropanswer: any = [];
  dragdropansweroption: any = [];
  fillintheblankanswer: any = [];

  singleanswerdiv = false;
  multianswerdiv = false;
  truefalseanswerdiv = false;
  dragdropanswerdiv = false;
  fillintheblankanswerdiv = false;

  chapterId = '';
  params: any;
  header = '';
  chapterName = '';
  chapterDuration = 0;
  chapterDescription = '';
  headerAdd = '';
  headerViewChap = '';
  trueFalseAns: any;
  constructor(
    private chapterService: ChapterService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public transalte: TranslateService) {
    this.chapterService.imageValue.subscribe(data => {
      this.audioVisible = false;
      this.vidioWithUrl = false;
      this.textVisible = false;
      this.GenUrl = data;
      this.imgVisible = true;
    });
    chapterService.audioValue.subscribe(audioData => {
      this.imgVisible = false;
      this.vidioWithUrl = false;
      this.textVisible = false;
      this.audioUrl = audioData;
      this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(this.audioUrl);
      this.audioVisible = true;
    });
    chapterService.videoValue.subscribe(videoData => {
      this.imgVisible = false;
      this.audioVisible = false;
      this.vidioWithUrl = false;
      this.videoVisible = true;
      this.videoUrl = videoData;
      this.textVisible = false;
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(this.videoUrl);
    });
    chapterService.pdfValue.subscribe(pdfData => {
      this.imgVisible = false;
      this.audioVisible = false;
      this.vidioWithUrl = false;
      this.videoVisible = false;
      this.pdfVisible = true;
      this.textVisible = false;
      this.pdfUrl = pdfData;
    });
    chapterService.TextValue.subscribe(TextData => {
      this.imgVisible = false;
      this.audioVisible = false;
      this.vidioWithUrl = false;
      this.videoVisible = false;
      this.pdfVisible = false;
      this.textVisible = true;
      this.TextUrl = TextData;
      this.TextUrl = this.sanitizer.bypassSecurityTrustResourceUrl(TextData);
    });
  }
  ngOnInit(): void {
    this.flag = 1;
    this.chapterId = this.route.snapshot.params.id;
    this.params = this.route.snapshot.paramMap.get('id');
    this.headerViewChap = this.route.snapshot.params.viewchapter;
    console.log(this.headerViewChap);
    this.chapterService.vidhyaDemo().subscribe((result: any) => {


      if (this.params === this.chapterId  ){
        for (let i of result.data){
          if (i._id === this.chapterId){
            this.chapterDetail = i;
            this.GenUrl = this.chapterDetail.chapterDocType.videoLinkUrl;
            console.log(this.GenUrl);
            this.GenUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.GenUrl.replace('/watch?v=', '/embed/'));
          }
        }
      }
      else{
        // tslint:disable-next-line: no-shadowed-variable
        this.chapterService.passChapNameToQues.subscribe(result => {
          this.chapterName = result;
        });
        this.chapterService.passChapdurationToQues.subscribe(res => {
          this.chapterDuration = res;
        });
        this.chapterService.passChapDesToQues.subscribe(response => {
          this.chapterDescription = response;
        });
        this.chapterService.passIdToQues.subscribe(res => {
          this.chapterId = res;
          console.log('this is chapter ID', this.chapterId);
        });
      }
  });
    this.getuser(this.chapterId);
}
  getuser(id: string): any{
    this.chapterService.questionList(id).subscribe((res: any) => {
      this.details = res.data;
      for (let i = 0; i < this.details.length; i++ ){
        console.log(i);
        if (this.details[i].questionType === 'single'){
          this.singleanswerdiv = true;
          this.singleanswer.push(this.details[i]);
          }
          else if (this.details[i].questionType === 'multiple'){
          console.log('multi');
          this.multianswerdiv = true;
          this.multianswer.push(this.details[i]);
          }
        else if (this.details[i].questionType === 'truefalse'){
          this.truefalseanswerdiv = true;
          this.truefalseanswer.push(this.details[i]);
        }
        else if (this.details[i].questionType === 'dragdrop'){
          this.dragdropanswerdiv = true;
          this.dragdropanswer.push(this.details[i]);
        }
        else if (this.details[i].questionType === 'fillblank'){
          this.fillintheblankanswerdiv = true;
          this.fillintheblankanswer.push(this.details[i]);
        }
      }
    });
  }
}
