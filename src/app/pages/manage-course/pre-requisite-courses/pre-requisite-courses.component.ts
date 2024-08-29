import { Component, Injectable, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../course-service/course.service';
import { CourseList } from '../manage-course';
import { ActivatedRoute } from '@angular/router';

export interface UpdatedPreReqCourse {
  id: string;
  preRequisiteCourses: (string)[];
}

@Component({
  selector: 'app-pre-requisite-courses',
  templateUrl: './pre-requisite-courses.component.html',
  styleUrls: ['./pre-requisite-courses.component.scss']
})


export class PreRequisiteCoursesComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  courseCtrl = new FormControl();
  filteredCourses?: Observable<string[]>;
  selectedCourses: string[] = [];
  updatedPreReqCourse?: UpdatedPreReqCourse;
  coursesId: string[] = [];
  dataSource: CourseList | undefined;
  allCourses: string[] = [];
  myParam = '';
  header = '';
  @ViewChild('courseInput') courseInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(private toastr: ToastrService, private courseService: CourseService, private route: ActivatedRoute) {

    this.courseService.getCourseList().subscribe({
      next: (res: any) => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          this.allCourses.push(res.data[i].courseName);
        }
      },
      complete: () => {
        // console.log(this.allCourses);
        this.filteredCourses = this.courseCtrl.valueChanges.pipe(
          startWith(null),
          map((course: string | null) => course ? this._filter(course) : this.allCourses.slice()));
      }
    });


  }
  ngOnInit(): void {
    this.myParam = this.route.snapshot.params.add;
    this.header = this.myParam === 'add' ? 'Add Course' : 'Edit Course';
    if (this.header === 'Edit Course') {
      this.courseService.getSingleCourse().subscribe((res: any) => {
        this.coursesId = res.data.preRequisiteCourses;
      });
      this.courseService.getCourseList().subscribe((res: any) => {
        // console.log(res);
        for (const course of res.data) {
          if (this.coursesId.includes(course._id)) {
            this.selectedCourses.push(course.courseName);
          }
        }
      });
    }

  }

  remove(course: string): void {
    const index = this.selectedCourses.indexOf(course);

    if (index >= 0) {
      this.selectedCourses.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedCourses.includes(event.option.viewValue)) {
      this.selectedCourses.push(event.option.viewValue);
    } else {
      this.toastr.error('This course is already selected');
    }
    this.courseInput.nativeElement.value = '';
    this.courseCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCourses.filter(course => course.toLowerCase().indexOf(filterValue) === 0);
  }

  saveCourse(): void {
    this.updatedPreReqCourse = {
      id: '',
      preRequisiteCourses: []
    };
    if (this.header === 'Add Course') {
      if (typeof this.updatedPreReqCourse !== 'undefined') {
        this.updatedPreReqCourse.id = this.courseService.newCourseId;
        this.courseService.getCourseList().subscribe({
          next: (res: any) => {
            for (const course of res.data) {
              if (this.selectedCourses.includes(course.courseName)) {
                this.updatedPreReqCourse?.preRequisiteCourses?.push(course._id);
              }
            }
          },
          complete: () => {
            this.courseService.updatePreReqCourse(this.updatedPreReqCourse).subscribe((res: any) => {
            });
          }
        });

      } else {
        console.log(this.selectedCourses);
        this.courseService.getCourseList().subscribe({
          next: (res: any) => {
            for (const course of res.data) {
              if (this.selectedCourses.includes(course.courseName)) {
                this.updatedPreReqCourse?.preRequisiteCourses?.push(course._id);
              }
            }
            if (typeof this.updatedPreReqCourse !== 'undefined') {
              if (!!this.courseService.editCourseId) {
                this.updatedPreReqCourse.id = this.courseService.editCourseId;
              }
              console.log(this.courseService.editCourseId);
            }
          },
          complete: () => {
            // console.log(this.updatedPreReqCourse);
            this.courseService.updatePreReqCourse(this.updatedPreReqCourse).subscribe((res: any) => {
              // console.log(res);
            });
          }
        });
      }
    }
  }
}
