import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import { ChapterService } from '../chapter-service/chapter.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  constructor(private chapterService: ChapterService, private route: ActivatedRoute, private sharedService: SharedService,
              private router: Router,
              public transalte: TranslateService) {
               }
  singleAnswerOption: any = {};
  selectedsingleAnswerOption: any = {};
  selectedAnswer: any;
  addingSingleOption: any = [];
  singleAnswerCompleteArray: any = [];

  multiAnswerOption: any = {};
  selectedMultiAnswer: any = {};
  multiAnswerCompleteArray: any = [];
  addingMultiAnswerOption: any = [];

  trueAndFalse: any = {};
  trueAndFalseCompleteArray: any = [];

  dragAndDropNumberofOption: any = {};
  dragAndDropOption: any = {};
  dragAndDropLength: any = [];
  dragAndDropCompelteArray: any = [];

  fillTheBlankTextAreaHideShow: any = true;
  nextButtonFillTheBlank: any = false;
  addButtonFillTheBlank: any = false;
  fillTheBlankNoOfBlankFinder: any;
  addingFillTheBlankOption: any = [];
  blanksCount: any = {};
  selectedFillTheBlankOption: any = {};
  fillTheBlankOption: any = {};
  fillTheBlankCompleteArray: any = [];

  selectedQuestion = 'single';
  selectedStatus = '1';
  selectedShuffle = 'n';
  ckeditorContent: any;
  viewOptions = '';
  header = '';
  headerAdd ='';
  chapterId: any;
  questionId: any;
  formData: any = {};

  enableTabs = false;
  QuestionSelectIndex = 1;
  gotIndex: any;
  questionDetail: any = {
    question: '',
    questionType: '',
    shuffle: '',
    answerJustification : '',
    status: '',
    option: {
      questionOption: ''
    },
  };
  ngOnInit(): void {
    this.chapterId = this.route.snapshot.params.id;
    this.questionId = this.route.snapshot.params.quesId;
    this.headerAdd = this.route.snapshot.params.add;
    this.addingSingleOption.push(this.singleAnswerOption );
    this.addingMultiAnswerOption.push(this.multiAnswerOption);
    console.log(this.selectedsingleAnswerOption);
    console.log(this.header);
    this.header = 'Add Question';
    if (this.questionId !== null){
      this.chapterService.editQuestion({id : this.questionId}).subscribe((result: any) => {
        this.header = 'Edit Question';
        this.questionDetail = result.data;
        this.viewOptions = this.questionDetail.questionType;
        if (this.viewOptions === 'fillblank'){
          this.fillTheBlankTextAreaHideShow = false;
          this.selectedStatus = this.questionDetail.status;
          for (let i = 0; i < this.questionDetail.option.length; i++){
            this.addingFillTheBlankOption = this.questionDetail.option ;
            this.fillTheBlankNoOfBlankFinder = this.questionDetail.question;
            this.fillTheBlankOption[i] = this.addingFillTheBlankOption[i].questionOption;
            if (this.addingFillTheBlankOption[i].status === '1'){
              this.selectedFillTheBlankOption = this.addingFillTheBlankOption[i].questionOption;
            }
          }
        }
        if (this.viewOptions === 'multiple'){
          for (let j = 0; j < this.questionDetail.option.length; j++){
            this.addingMultiAnswerOption = this.questionDetail.option;
            this.multiAnswerOption[j] = this.addingMultiAnswerOption[j].questionOption;
            if (this.addingMultiAnswerOption[j].status === '1'){
              this.selectedMultiAnswer[j] = true;
            }
            else
            {
              this.selectedMultiAnswer[j] = false;
            }
          }
        }
        if (this.viewOptions === 'single'){
          for (let i = 0; i < this.questionDetail.option.length; i++){
            this.addingSingleOption =  this.questionDetail.option;
            console.log(this.addingSingleOption);
            this.singleAnswerOption[i] = this.addingSingleOption[i].questionOption;
            // console.log(this.selectedsingleAnswerOption);
            if (this.addingSingleOption[i].status === '1'){
              this.selectedsingleAnswerOption = this.addingSingleOption[i].questionOption;
              console.log('selected', this.selectedsingleAnswerOption);
            }
            // console.log(this.selectedsingleAnswerOption);
          }
        }
        if (this.viewOptions === 'dragdrop'){
          for (let i = 0; i < this.questionDetail.option.length; i++){
            this.dragAndDropLength = this.questionDetail.option;
            this.dragAndDropOption[i] = this.dragAndDropLength[i].questionOption;
          }
        }
        if (this.viewOptions === 'truefalse'){
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.questionDetail.option.length; i++){
            if (this.questionDetail.option[i].status === '1'){
              this.trueAndFalse = this.questionDetail.option[i].questionOption;
              console.log(this.trueAndFalse);
              console.log(this.questionDetail.option[i]);
            }
        }
      }
      });
    }
  }
  disablefunc(): void{
    this.fillTheBlankTextAreaHideShow = true;
  }
  onSubmit(question: NgForm): void {
    if (this.viewOptions === 'single') {
      console.log('Selected Option Value-----', this.selectedsingleAnswerOption);
      console.log('Selected-----', this.selectedAnswer);
      console.log('options', this.singleAnswerOption);
      console.log('adding', this.addingSingleOption);
      for (let i = 0; i < this.addingSingleOption.length ; i++){
        if (this.singleAnswerOption[i] === this.selectedsingleAnswerOption){
          this.singleAnswerCompleteArray.push(this.singleAnswerOption[i] = {status: '1', questionOption: this.singleAnswerOption[i]});
        }
        else {
          this.singleAnswerCompleteArray.push(this.singleAnswerOption[i] = {status: '0', questionOption: this.singleAnswerOption[i]});
        }
      }
      console.log('All option and Answers Together-----', this.singleAnswerCompleteArray);
    }
    if (this.viewOptions === 'multiple') {
      console.log(this.selectedMultiAnswer);
      console.log('multi answer', this.multiAnswerOption);
      for (let i = 0; i < this.addingMultiAnswerOption.length; i++) {
        if ( this.selectedMultiAnswer[i] === true) {
          this.multiAnswerCompleteArray.push(this.multiAnswerOption[i] = {status: '1', questionOption: this.multiAnswerOption[i]});
        }
        else {
          this.multiAnswerCompleteArray.push(this.multiAnswerOption[i] = {status: '0', questionOption: this.multiAnswerOption[i]});
        }
      }
      console.log(this.multiAnswerCompleteArray);
    }
    if (this.viewOptions === 'truefalse') {
      console.log(' ', this.trueAndFalse);
      if (this.trueAndFalse === 'True'){
          this.trueAndFalseCompleteArray.push(this.trueAndFalse = {status : '1', questionOption: 'True'},
          {status : '0', questionOption: 'False'
        });
        }
      if (this.trueAndFalse === 'False'){
          this.trueAndFalseCompleteArray.push(this.trueAndFalse =
          {status : '0', questionOption: 'True'},  {status : '1', questionOption: 'False'});
        }

    }
    if (this.viewOptions === 'dragdrop') {
      console.log(this.dragAndDropNumberofOption);
      console.log(this.dragAndDropOption);
      console.log('fsad');
      for (let i = 0; i < Number(this.dragAndDropLength.length); i++){
      this.dragAndDropCompelteArray.push(this.dragAndDropOption[i] = {status: '1',
      questionOption: this.dragAndDropOption[i], optionOrder: i + 1});
    }
      console.log(this.dragAndDropCompelteArray);
    }
    if (this.viewOptions === 'fillblank'){
      console.log(this.fillTheBlankOption);
      console.log(this.selectedFillTheBlankOption);

      for (let i = 0; i < this.addingFillTheBlankOption.length; i++) {
        if (this.fillTheBlankOption[i] === this.selectedFillTheBlankOption) {
          this.fillTheBlankCompleteArray.push(this.fillTheBlankOption[i] = {status: '1', questionOption: this.fillTheBlankOption[i]});
        }
        else {
          this.fillTheBlankCompleteArray.push(this.fillTheBlankOption[i] = {status: '0', questionOption: this.fillTheBlankOption[i]});
        }
      }
      console.log(this.fillTheBlankCompleteArray);
    }
    const answersoptions = {
      option: ''
    };
    if (this.viewOptions === 'single'){
    answersoptions.option = this.singleAnswerCompleteArray;
    }
    if (this.viewOptions === 'multiple'){
    answersoptions.option = this.multiAnswerCompleteArray;
    }
    if (this.viewOptions === 'truefalse'){
    answersoptions.option = this.trueAndFalseCompleteArray;
    }
    if (this.viewOptions === 'dragdrop'){
    answersoptions.option = this.dragAndDropCompelteArray;
    }
    if (this.viewOptions === 'fillblank'){
    answersoptions.option = this.fillTheBlankCompleteArray;
    }
    this.formData = Object.assign(answersoptions , question, {chapterId : this.chapterId}, {adminId : '5f9f9bf202b7dd0d48b451fd'});
    console.log('Form Data----', this.formData);
    console.log(this.header);
    if (this.headerAdd === 'add'){
      this.sharedService.showSuccess('Question Added Successfully...');
      this.chapterService.saveQuestion(this.formData).subscribe((res: any) => {
        console.log(res);
      });
      this.router.navigate(['manage-chapter/add']);
      // this.chapterService.enableTabFAQtoQ.next(this.enableTabs);
      this.chapterService.passIndexFromAddQues = true;
      this.chapterService.FromAddQuesToQuesList.next(this.QuestionSelectIndex);
    }
    else{
      this.sharedService.showSuccess('Question Update Successfully...');
      this.formData = Object.assign(answersoptions , question, {chapterId : this.chapterId},
      {adminId : '5f9f9bf202b7dd0d48b451fd'}, {id: this.questionId});
      this.chapterService.updateQuestion(this.formData).subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['manage-chapter/edit', this.chapterId]);
          this.chapterService.passIndexFromAddQues = true;
          this.chapterService.FromAddQuesToQuesList.next(this.QuestionSelectIndex);
        });
    }
  }
  addSingleAnswerOption(): void {
    // this.addingSingleOption.push(this.singleAnswerOption);
    this.addingSingleOption.push({});
  }
  addMultiAnswerOption(): void {
    this.addingMultiAnswerOption.push(this.multiAnswerOption);
  }

  dragAndDrop(): void{
    this.dragAndDropLength.length = Number(this.dragAndDropNumberofOption - 1);
    this.dragAndDropLength.push(this.dragAndDropNumberofOption);
  }
  filltheblank(): void{
    this.fillTheBlankTextAreaHideShow = false;
    this.viewOptions = 'fillblank';
    this.nextButtonFillTheBlank = true;
  }
  addFillTheBlank(): void{
    this.nextButtonFillTheBlank = false;
    this.addButtonFillTheBlank = true;
    this.blanksCount = (this.fillTheBlankNoOfBlankFinder.match(/@__@/g) || []).length;
    console.log(this.blanksCount);
    this.addingFillTheBlankOption.length = Number(this.blanksCount - 1);
    this.addingFillTheBlankOption.push(this.blanksCount);
  }
  addFillTheBlankMoreOption(): any{
    this.addingFillTheBlankOption.push(this.blanksCount);
  }
  remove(index: any): void {
    this.addingSingleOption.splice(-1, 1);
    this.addingMultiAnswerOption.splice(-1, 1);
    this.addingFillTheBlankOption.splice(-1, 1);
  }

}

