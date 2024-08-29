import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModulesService } from '../module-service/modules.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


// tslint:disable-next-line: class-name
export interface exam {
  moduleId: string;
  examAttempt: number;
  examDuration: number;
  examTimePeriod: number;
  passingPercentage: number;
  totalExamQuestion: number;
  chapterInfo?: (ChapterInfo)[] | null;
  _id?: string;

}

export interface ChapterInfo
{
  chapterId: string;
  count: number;
}

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {

  numberOfQuestions: any[] = [];
  // tslint:disable-next-line: typedef
  // dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['chapterName', 'totalQuestion', 'selectQuestions'];
  dataSource: any;
  totalQuestion = 0;
  totalExamQuestion = 0;
  headParam = '';
  header = '';
  addResponse?: exam;
  updateExam?: exam;
  ChapId = '';
  constructor(public moduleService: ModulesService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.addResponse = {
      moduleId: '',
      examAttempt: 0,
      examTimePeriod: 0,
      examDuration: 0,
      passingPercentage: 0,
      totalExamQuestion: 0,
      chapterInfo: []
    };
  }
  ModuleExam = new FormGroup({
    examAttempt: new FormControl('', Validators.required),
    examTimePeriod: new FormControl('', Validators.required),
    examDuration: new FormControl('', Validators.required),
    passingPercentage: new FormControl('', Validators.required),
    // totalExamQuestion: new FormControl('', Validators.required),
  });



  ngOnInit(): void {
    console.log('chapter Id', this.moduleService.chapterId);
    this.headParam = this.route.snapshot.params.add;
    this.header = this.headParam;
    console.log(this.header);
    this.moduleService.viewModules().subscribe((res: any) => {
      this.dataSource = res.data[0].chapterId;
      this.moduleService.editmoduleId = res.data[0].moduleExamId;
      console.log('viewmodule', this.dataSource);
      if (this.header !== 'add')
      {
        console.log('in if condition->', res.data);
        this.moduleService.editModuleExam().subscribe((result: any) => {
          console.log(result);
          this.ModuleExam.get('examAttempt')?.setValue(result.data.examAttempt);
          this.ModuleExam.get('examTimePeriod')?.setValue(result.data.examTimePeriod);
          this.ModuleExam.get('examDuration')?.setValue(result.data.examDuration);
          this.ModuleExam.get('passingPercentage')?.setValue(result.data.passingPercentage);
          this.totalQuestion = result.data.totalExamQuestion;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < result.data.chapterInfo.length; i++ ){
            this.numberOfQuestions.push(result.data.chapterInfo[i].count);
          }
          this.updateExam = result.data;
        });
      }
    });
  }

  noQue(value: any): void{
    console.log('number1', value);
    this.totalQuestion = this.numberOfQuestions.reduce((a, b) => a + b, 0);
    console.log('hello question ', this.totalQuestion);
  }

  onSave(): void{
    if (this.totalQuestion === 0 || this.totalQuestion === NaN){
      this.toastr.error('Atleast Add One Question');
    }
    else{

      console.log(this.totalQuestion)
      if (this.header === 'add'){
        if (!!this.addResponse) {
          this.addResponse.examAttempt = this.ModuleExam.get('examAttempt')?.value;
          this.addResponse.passingPercentage = this.ModuleExam.get('passingPercentage')?.value;
          this.addResponse.examDuration = this.ModuleExam.get('examDuration')?.value;
          this.addResponse.examTimePeriod = this.ModuleExam.get('examTimePeriod')?.value;
          this.addResponse.totalExamQuestion = this.totalQuestion;
          this.addResponse.moduleId = this.moduleService.id;
          delete this.addResponse._id;

          if (!!this.addResponse.chapterInfo) {
            for (let i = 0; i < this.moduleService.chapterId.length; i++) {
              this.addResponse.chapterInfo.push({
                chapterId: this.moduleService.chapterId[i],
                count: this.numberOfQuestions[i]
              });
            }
         }
        }
        this.moduleService.addExam(this.addResponse).subscribe((res: any) => {
          console.log('create exam res', res);
        });

        console.warn(this.ModuleExam.value);
        console.warn(this.numberOfQuestions);
        console.warn(this.numberOfQuestions.reduce((a, b) => a + b, 0));
        this.router.navigateByUrl('/manage-module');
      }
      else{
        if (!!this.updateExam){
          this.updateExam.examAttempt = this.ModuleExam.get('examAttempt')?.value;
          this.updateExam.examDuration = this.ModuleExam.get('examDuration')?.value;
          this.updateExam.examTimePeriod = this.ModuleExam.get('examTimePeriod')?.value;
          this.updateExam.passingPercentage = this.ModuleExam.get('passingPercentage')?.value;
          this.updateExam.totalExamQuestion = this.totalQuestion;
          this.updateExam.moduleId = this.moduleService.id;
          delete this.updateExam._id;
          if (!!this.updateExam.chapterInfo) {
            for (let i = 0; i < this.updateExam.chapterInfo.length; i++){
              this.updateExam.chapterInfo[i].count = this.numberOfQuestions[i];
              console.log(this.updateExam.chapterInfo[i].count);
            }
          }
          this.moduleService.updateExam(this.updateExam).subscribe({
            next: (res: any) => {
              console.log('success');
            },
            error: () => {
              console.log('Error');
            },
            complete : () => {}
          });
          this.toastr.success('Exam Edit Successfully');
          this.router.navigateByUrl('/manage-module');
        }
      }
    }
  }

  trackByIndex(index: number): any {
    return index;
  }

  redirectToModule(): void{
    // const createExam={'examAttempt':this.examAttempt,'examDuration':this.examDuration,
    // 'examTimePeriod':this.examTimePeriod,'moduleId':this.moduleId,'passingPercentage':this.passingPercentage,
    // 'totalExamQuestion':this.totalExamQuestion}

    this.moduleService.redirectToModule();
  }
}
