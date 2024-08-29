import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { CourseService } from '../course-service/course.service';

interface ModuleDetail {
  ModuleName: string;
  moduleTime: number;
}
interface ModuleDetails {
  _id: string;
  ModuleName: string,
  moduleTime: number
  adminId: {
    firstName: string;
    lastName: string;
    _id: string;
  }
  createdAt: Date;
  updatedAt: Date;
}


@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrls: ['./course-module.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseModuleComponent implements OnInit {
  constructor(private courseService: CourseService, private router: Router, private toastr: ToastrService, private dialog: MatDialog) { }
  totalEstimatedTime: number = 0;
  myControl = new FormControl();
  filteredOptions!: Observable<ModuleDetail[]>;
  moduleName: string = "";
  moduleDetail: ModuleDetail[] = [];
  moduleId: string[] = [];
  allModules: ModuleDetails[] = [];
  isLoadingResults = true;
  headerName: string = ''
  ngOnInit(): void {
    this.courseService.getModules().subscribe(res => {
      this.allModules = res.data;
      this.headerName = this.courseService.myParam;
      if (!(this.courseService.myParam == 'add')) {
        this.courseService.displayModule().subscribe(res => {
          this.isLoadingResults = false;
          res.data.forEach((element: any) => {
            let module: ModuleDetail = {
              ModuleName: element._id.name,
              moduleTime: this.allModules.filter(ele => {
                console.log("name",element._id.name)
                return ele._id == element._id._id
              })[0]?.moduleTime
            }
            console.log("time",module.ModuleName);
          console.log("name",module.moduleTime)
            this.totalEstimatedTime += module.moduleTime;
            this.moduleId.push(element._id._id as string);
            this.moduleDetail.push(module);
          });
        });
      }
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      // console.log(this.allModules);
    });
  }
  private _filter(value: string): ModuleDetail[] {
    const filterValue = value.toLowerCase();
    return this.allModules.filter(option => option.ModuleName.toString().toLowerCase().indexOf(filterValue) === 0);
  }
  onSave() {
    this.courseService.addModule(this.moduleId, this.totalEstimatedTime).subscribe(res => {
      console.log(res);
      this.courseService.enableCourseExamTab$.next(false);
      this.courseService.redirectTab$.next(2);
      this.toastr.success('Modules are successfully added');
    });

    // console.log(this.moduleDetail);
  }
  onCancel() {
    this.router.navigate(['manage-course']);
  }
  displayFn(): string {
    return '';
  }
  selectedValue(ModuleName: string) {
    console.log(ModuleName);
    const index = this.allModules.findIndex((ele) => {
      return ele.ModuleName == ModuleName
    });
    console.log(this.allModules[index]);
    console.log('Modules', this.moduleDetail);
    if ((this.moduleDetail.findIndex((ele: any) => { return ele.ModuleName == ModuleName })) == -1) {
      this.totalEstimatedTime += this.allModules[index].moduleTime;
      this.moduleDetail.push({ "ModuleName": ModuleName, "moduleTime": this.allModules[index].moduleTime });
      this.moduleId.push(this.allModules[index]._id)
      // console.log(this.moduleDetail);
    } else {
      this.toastr.warning(`${ModuleName} is already selected`);
    }
  }

  deleteModule(index: number) {
    const dialogRef = this.dialog.open(DialogboxComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const ModuleName = this.moduleDetail[index].ModuleName;
        const i = this.allModules.findIndex((ele) => {
          return ele.ModuleName == ModuleName
        });
        this.totalEstimatedTime -= this.moduleDetail[index].moduleTime;
        this.moduleId.splice(this.moduleId.findIndex(ele => ele == this.allModules[i]._id), 1);
        this.moduleDetail.splice(index, 1);
        this.toastr.success(`${ModuleName} is successfully removed.`);
      }
    })
  }
}
