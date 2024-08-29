import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../course-service/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  url: string = '';
  buttonName: string = 'View';
  fileName: string = '';
  length: number = 0;
  header: string = '';
  isLoadingResults = true;
  constructor(private courseService: CourseService, private router: Router,
              private route: ActivatedRoute, private toastr: ToastrService) { }
  courseDetail = new FormGroup({
    courseName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    popularCourse: new FormControl(false),
    isFeature: new FormControl(false),
    enRollCourseDescription: new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required),
    detailDescription: new FormControl('', Validators.required)
  })
  singleCourse: any
  ngOnInit(): void {
    this.courseService.myParam = this.route.snapshot.params.add;
    this.header = this.courseService.myParam === 'add' ? 'Add Course' : 'Edit Course';
    this.courseService.tabHeader$.next(this.header);
    console.log(this.header);
    if (this.header === 'Edit Course') {
      this.courseService.editCourseId = this.route.snapshot.paramMap.get('id');
      this.courseService.getSingleCourse().subscribe((res: any) => {
        this.isLoadingResults = false;
        this.singleCourse = res.data;
        this.courseDetail.get('courseName')?.setValue(this.singleCourse.courseName);
        this.courseDetail.get('popularCourse')?.setValue(this.singleCourse.popularCourse);
        this.courseDetail.get('isFeature')?.setValue(this.singleCourse.isFeature);
        this.courseDetail.get('imageUrl')?.setValue(this.singleCourse.imageUrl);
        this.courseDetail.get('enRollCourseDescription')?.setValue(this.singleCourse.enRollCourseDescription);
        this.courseDetail.get('shortDescription')?.setValue(this.singleCourse.shortDescription);
        this.courseDetail.get('detailDescription')?.setValue(this.singleCourse.detailDescription);
      });
    }
  }

  onSelectImage(event: any): void {
    // console.log(event)
    this.length = event.target.files.length;
    if (this.length === 1) {
      const reader = new FileReader();
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        this.url = event.target.result;
        // console.log(this.url)
      };
    } else {
      this.fileName = 'No file choosen';
      this.url = '';
    }
  }
  viewImage() {
    let newTab = window.open('', '_blank');
    newTab?.document.write(`<html><title>Image Preview</title><body><image src =${this.url}></body></html>`);
    newTab?.document.close();
  }

  onSave() {
    let formData = new FormData();
    formData.append('courseName', this.courseDetail.get('courseName')?.value);
    formData.append('popularCourse', this.courseDetail.get('popularCourse')?.value);
    formData.append('isFeature', this.courseDetail.get('isFeature')?.value);
    formData.append('enRollCourseDescription', this.courseDetail.get('enRollCourseDescription')?.value);
    formData.append('shortDescription', this.courseDetail.get('shortDescription')?.value);
    formData.append('detailDescription', this.courseDetail.get('detailDescription')?.value);
    if (this.header == 'Add Course') {
      formData.append('imageUrl', this.courseDetail.get('imageUrl')?.value);
      this.courseService.saveCourse(formData).subscribe((res: any) => {
        this.courseService.newCourseId = res.data._id;
        this.courseService.enableCourseModuleTab$.next(false);
        this.courseService.redirectTab$.next(1);
        this.toastr.success('Course successfully Created');
      });
    } else if (this.header == 'Edit Course') {
      formData.append('id', this.singleCourse._id);
      console.log(formData)
      this.courseService.updateCourse(formData).subscribe((res: any) => { })
      this.courseService.enableCourseModuleTab$.next(false);
      this.courseService.redirectTab$.next(1);
      this.toastr.success('Course successfully updated');
    }
  }
  onCancel() {
    this.router.navigate(['manage-course']);
  }
}


