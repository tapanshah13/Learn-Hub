import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../course-service/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, AfterContentChecked {

  enableCourseModule: boolean = true
  enableCourseExam: boolean = true
  selectedIndex: number = 0
  tabHeader: string = ''
  chooseOption: boolean | undefined;
  constructor(private courseService: CourseService, private ref: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.courseService.tabHeader$.subscribe((res: string) => {
      this.tabHeader = res;
      if (this.tabHeader === 'Add Course') {
        this.chooseOption = true;
      } else {
        this.chooseOption = false;
      }
    });

    this.courseService.enableCourseModuleTab$.subscribe((res: boolean) => this.enableCourseModule = res)
    this.courseService.enableCourseExamTab$.subscribe((res: boolean) => this.enableCourseExam = res)
    this.courseService.redirectTab$.subscribe((res: number) => this.selectedIndex = res)

  }
  ngAfterContentChecked() {
    this.ref.detectChanges();
  }
}
