import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChapterService } from '../chapter-service/chapter.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss'],
})
export class AddChapterComponent implements OnInit, AfterViewInit {
  myTrustedURL: any;
  url: any;
  audioUrl: any;
  videoUrl: any;
  pdfUrl: any;
  textUrl: any;
  videoWithUrl: any;
  questionSelectedIndex = 1;
  SwitchModel: any;
  ckeditorContent = '';
  gotIndex = 1;
  visibleImg: any;
  visiblePdf = false;
  visibleVideoUrl = false;
  visibleAudio = false;
  visibleVideo = false;
  visibleText = false;

  videoLinkUrl: any;
  tabVisible = false;
  chapterId: any;
  header = '';
  length = 0;

  chapterDetail: any = {
    id: '',
    name: '',
    duration: '',
    chapterType: '',
    chapterDocType: '',
    shortDescription: '',
    isActive: '',
    documentUrl: '',
    videoLinkUrl: '',
  };

  myParam = '';
  constructor(
    private chapterService: ChapterService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    public transalte: TranslateService
  ) {
    chapterService.tabVisible.subscribe((result) => this.tabVisible = result);
    chapterService.imageValue.subscribe((result) => this.url = result );
    chapterService.audioValue.subscribe((result) => this.audioUrl = result );
    chapterService.videoValue.subscribe((result) => this.videoUrl = result);
    chapterService.pdfValue.subscribe((result) => this.pdfUrl = result);
    chapterService.TextValue.subscribe((result) => this.textUrl = result);
  }
  ngAfterViewInit(): void{
  }
  ngOnInit(): void {
    this.chapterId = this.route.snapshot.paramMap.get('id');
    this.myParam = this.route.snapshot.params.id;
    this.header = this.myParam === this.chapterId ? 'Edit Chapter' : 'Add chapter';
    console.log('switch model', this.SwitchModel);

    this.chapterService.passTabHeader.next(this.header);
    if (this.myParam === this.chapterId) {
      this.chapterService
        .editChapter(this.chapterId)
        .subscribe((result: any) => {
          this.chapterDetail = result.data;
          this.SwitchModel = this.chapterDetail.chapterDocType.chapterType;
          const videoUrl = this.chapterDetail.chapterDocType.videoLinkUrl;
          this.videoLinkUrl = videoUrl;
        });
    }
    console.log(this.myParam);
    if (this.chapterService.passIndexFromAddQues){
      this.chapterService.FromChapterToQuestion.next(1);
      this.chapterService.enableTabFAQtoQ.next(false);
    }
  }
  chapterSave(data: any): void {
    var formData: any = new FormData();
    formData.append('name', data.name);
    formData.append('duration', data.duration);
    formData.append('shortDescription', data.shortDescription);
    formData.append('documentType', data.documentType);
    formData.append('isActive', data.isActive);
    if (data.documentType === 'videolink'){
      formData.append('videoLinkUrl', data.videoLinkUrl);
    }
    else{
      formData.append('documentUrl', data.documentUrl);
    }

    if (this.ckeditorContent === '') {
      alert('plzz enter short discription');
    } else {
      if (this.myParam !== this.chapterId) {
        this.sharedService.showSuccess('Chapter Added Successfully..');
        this.chapterService.saveChapter(formData).subscribe((result: any) => {
          console.log('save chapter data', result.data);
          this.chapterService.tabVisible.next(this.tabVisible);
          this.chapterService.passChapNameToQues.next(result.data.name);
          this.chapterService.passChapdurationToQues.next(result.data.duration);
          this.chapterService.passChapDesToQues.next(result.data.shortDescription);
          this.chapterService.passIdToQues.next(result.data._id);
        });
        this.chapterService.FromChapterToQuestion.next(this.questionSelectedIndex);
      } else {
        this.sharedService.showSuccess('Chapter Edit Successfully..');
        formData.append('id', this.chapterId);
        console.log(this.chapterDetail);
        this.chapterService.updateChapter(formData).subscribe((result: any) => {
          console.log('result', result);
        });
        this.chapterService.FromChapterToQuestion.next(this.questionSelectedIndex);
      }
    }
  }
  onSelectFile(event: any): void {
    const reader = new FileReader();
    console.log('hello', reader.readAsDataURL(event.target.files[0])); // read file as data url
    // tslint:disable-next-line: no-shadowed-variable
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
  }
  onImgChange(event: any): void {
    this.length = event.target.files.length;
    const file = event.target.files[0];
    this.chapterService.convertToBase64(file).subscribe((data: any) => {
      this.url = data;
      this.audioUrl = data;
      this.videoUrl = data;
      this.pdfUrl = data;
      this.textUrl = data;
    });
  }

  // this function is used when user select next redio button (ex image to pdf) then image con disable
  DisableWhenChnagedRadio(): void {
    this.visibleImg = false;
    this.visiblePdf = false;
    this.visibleVideoUrl = false;
    this.visibleAudio = false;
    this.visibleVideo = false;
    this.visibleText = false;
  }
  // below function used for view image
  viewImgFunc(event: any): void {
    this.chapterService.imageValue.next(this.url);
    this.visibleImg = true;
  }
  // below function used for view Pdf
  viewPdfFunc(event: any): void {
    this.chapterService.pdfValue.next(this.pdfUrl);
    this.visiblePdf = true;
  }
  // below function used for view Video With Url
  viewVideoUrlFunc(videoWithUrl: string): void {
    this.visibleVideoUrl = true;
    console.log('it does nothing', videoWithUrl);
    this.videoWithUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      videoWithUrl.replace('/watch?v=', '/embed/')
    );
  }
  // below function used for view Audio
  viewAudioFunc(event: any): void {
    this.chapterService.audioValue.next(this.audioUrl);
    this.visibleAudio = true;
    this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(this.url);
  }
  // below function used for view Video
  viewVideoFunc(event: any): void {
    this.chapterService.videoValue.next(this.videoUrl);
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(this.videoUrl);
    this.visibleVideo = true;
  }
  // below function used for view Text File
  viewTextFunc(event: any): void {
    this.chapterService.TextValue.next(this.textUrl);
    this.textUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.visibleText = true;
  }
}
