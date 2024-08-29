import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseService } from './course-service/course.service';
import { CourseList, AdminId, RootObject } from './manage-course';


@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ManageCourseComponent implements OnInit {
  displayedColumns: string[] = ['srNo', 'courseName', 'adminId', 'totalEstimatedTime', 'createdAt', 'updatedAt', 'status', 'actions'];
  dataSource = new MatTableDataSource<CourseList>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterValue: any;
  isLoadingResults = true;
  constructor(private dialog: MatDialog, private courseService: CourseService) {
  }
  ngOnInit(): void {
    this.courseService.getCourseList().subscribe((res: any) => {
      console.log(res);
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(res.data) ;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  // ngAfterViewInit(): void { }

  // // tslint:disable-next-line: typedef
  // applyFilter(event: Event) {
  //   this.filterValue = (event.target as HTMLInputElement).value;
  //   this.filterValue = this.filterValue.trim(); // Remove whitespace
  //   this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = this.filterValue;
  // }

  deleteRecord(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'Course', description: 'course'};
    dialogConfig.disableClose = true;
    let dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseService.deleteCourse(id).subscribe(res => {
          console.log(id);
          this.refreshPage();
        });
        // this.dataSource.data.splice(id, 1);
      }
    });
  }
  refreshPage() {
    setTimeout(() => { this.ngOnInit(); }, 1000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // tslint:disable-next-line: typedef
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }
}
