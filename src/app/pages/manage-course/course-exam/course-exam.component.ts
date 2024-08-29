import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course-service/course.service';

export interface addResponse {
  courseId: string;
  attempt: number;
  examTimePeriod: number;
  examDuration: number;
  passingPercentage: number;
  totalExamQuestion: number;
  moduleInfo?: (ModuleAllInfo)[] | null;
  reviewExam: string;
  _id?: string;
  courseExamId?: string;
}
export interface ModuleAllInfo {
  _id?: string;
  moduleId: string;
  count: number;
}



@Component({
  selector: 'app-course-exam',
  templateUrl: './course-exam.component.html',
  styleUrls: ['./course-exam.component.scss']
})
export class CourseExamComponent implements OnInit {

  displayedColumns: string[] = ['moduleName', 'moduleQuestions', 'selectQuestions'];
  // dataSource = ELEMENT_DATA;
  dataSource?: any;
  singleCourse: any;
  numberOfQuestions: any[] = [];
  totalQuestion = 0;
  myParam = '';
  header = '';
  courseExamId: any;
  addResponse?: addResponse;
  updatedObj?: addResponse;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {
    this.addResponse = {
      courseId: '',
      attempt: 0,
      examTimePeriod: 0,
      examDuration: 0,
      passingPercentage: 0,
      totalExamQuestion: 0,
      reviewExam: '',
      moduleInfo: [
        {
          moduleId: '',
          count: 0
        },
      ]
    };
  }
  courseExam = new FormGroup({
    attempt: new FormControl('', Validators.required),
    examTimePeriod: new FormControl('', Validators.required),
    examDuration: new FormControl('', Validators.required),
    passingPercentage: new FormControl('', Validators.required),
    reviewExam: new FormControl(false),
  });

  ngOnInit(): void {
    this.myParam = this.route.snapshot.params.add;
    this.header = this.myParam === 'add' ? 'Add Course' : 'Edit Course';

    if (this.header === 'Add Course') {
      this.courseService.editCourseId = this.courseService.newCourseId;
      console.log(this.courseService.newCourseId);
      if (this.courseService.newCourseId.length > 0) {
        console.log('%c module he yaha pe', 'color:green');
        this.courseService.getCourseModule().subscribe((res: any) => {
          this.dataSource = res.data;
          console.log('datasource', this.dataSource);
        });
      }
      // this.courseService.getSingleCourse().subscribe((res: any) => {
      //   // console.log(res);
      //   // console.log(res.data.moduleId);
      //   this.dataSource = res.data.moduleId;
      // });
    } else {
      this.courseService.getCourseModule().subscribe((res: any) => {
        // console.log(res);
        this.dataSource = res.data;
      });
      this.courseService.getSingleCourse().subscribe((res: any) => {
        // console.log(res);
        this.courseExamId = res.data.courseExamId;
        this.courseService.getCourseExam(this.courseExamId).subscribe((res: any) => {
          // console.log(res);
          this.courseExam.get('attempt')?.setValue(res.data.attempt);
          this.courseExam.get('passingPercentage')?.setValue(res.data.passingPercentage);
          this.courseExam.get('examDuration')?.setValue(res.data.examDuration);
          this.courseExam.get('examTimePeriod')?.setValue(res.data.examTimePeriod);
          this.courseExam.get('reviewExam')?.setValue(res.data.reviewExam);
          this.totalQuestion = res.data.totalExamQuestion;
          for (let i = 0; i < res.data.moduleInfo.length; i++) {
            this.numberOfQuestions.push(res.data.moduleInfo[i].count);
          }
          this.updatedObj = res.data;

        });
      });
    }
  }
  ngOnChange() {

  }
  changeOption(value: any) {
    // console.log(value);
    this.totalQuestion = this.numberOfQuestions.reduce((a, b) => a + b, 0);
  }
  getCheckboxes(event: any) {
    // console.log(event.checked);
  }
  onSave() {
    // console.log(this.courseExam.value);
    // console.log(this.numberOfQuestions);
    // console.log(this.numberOfQuestions.reduce((a, b) => a + b, 0));
    if (this.header === 'Add Course') {
      if (!!this.addResponse) {
        this.addResponse.attempt = this.courseExam.get('attempt')?.value;
        this.addResponse.passingPercentage = this.courseExam.get('passingPercentage')?.value;
        this.addResponse.examDuration = this.courseExam.get('examDuration')?.value;
        this.addResponse.examTimePeriod = this.courseExam.get('examTimePeriod')?.value;
        this.addResponse.reviewExam = this.courseExam.get('reviewExam')?.value.toString();
        this.addResponse.totalExamQuestion = this.totalQuestion;
        this.addResponse.courseId = this.courseService.newCourseId;
        delete this.addResponse._id;

        if (!!this.addResponse.moduleInfo) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.courseService.newModuleId.length; i++) {
            this.addResponse.moduleInfo.push({
              moduleId: this.courseService.newModuleId[i],
              count: this.numberOfQuestions[i]
            });
          }
        }
      }
      // console.log(this.addResponse);
      this.courseService.addCourseExam(this.addResponse).subscribe({
        next: (res: any) => {
          console.log('success');
          this.courseService.redirectTab$.next(3);
        },
        error: () => {
          console.log('error');
        },
        complete: () => { }
      }
      );

    } else if (this.header === 'Edit Course') {
      if (!!this.updatedObj) {
        this.updatedObj.attempt = this.courseExam.get('attempt')?.value;
        this.updatedObj.passingPercentage = this.courseExam.get('passingPercentage')?.value;
        this.updatedObj.examDuration = this.courseExam.get('examDuration')?.value;
        this.updatedObj.examTimePeriod = this.courseExam.get('examTimePeriod')?.value;
        this.updatedObj.reviewExam = this.courseExam.get('reviewExam')?.value;
        this.updatedObj.totalExamQuestion = this.totalQuestion;
        this.updatedObj.courseExamId = this.courseExamId;
        delete this.updatedObj._id;

        if (!!this.updatedObj.moduleInfo) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.updatedObj.moduleInfo.length; i++) {
            this.updatedObj.moduleInfo[i].count = this.numberOfQuestions[i];
          }
        }
      }
      // console.log(this.updatedObj);
      this.courseService.updateCourseExam(this.updatedObj).subscribe({
        next: (res: any) => {
          console.log('success');
          this.courseService.redirectTab$.next(3);
        },
        error: () => {
          console.log('error');
        },
        complete: () => { }
      }
      );
    }
  }
  // for using ngModel in ngFor use trackBy
  trackByIndex(index: number): any {
    return index;
  }
}
