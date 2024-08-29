import {AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { ChapterService } from '../chapter-service/chapter.service';
export interface PeriodicElement {
  _id: string;
  SrNo: number;
  name: string;
  added_by: {
    firstName: string,
    lastName: string
  };
  duration: number;
  createdAt: string;
  updatedAt: string;
  isActive: string;
}

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChapterListComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['SrNo', 'name', 'added_by', 'duration', 'createdAt', 'updatedAt', 'isActive', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  title = '';
  description = '';
  chapterDetail: any;
  value: any;
  isLoadingResults = true;
  constructor(private dialog: MatDialog, private chapterService: ChapterService) {
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void{
  }
  ngOnInit(): void{
    this.chapterService.vidhyaDemo().subscribe((result: any) => {
      this.isLoadingResults = false;
      this.chapterDetail = result;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.chapterDetail.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data[0]);
    });
  }


  openDialog(id: any): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'Chapter', description: 'chapter'};
    dialogConfig.disableClose = true;
    const elementRef = this.dialog.open(DialogboxComponent, dialogConfig);
    // tslint:disable-next-line: deprecation
    elementRef.afterClosed().subscribe(result => {
      if (result === 'true'){
        console.log('remove function work');
        // const sss = this.ELEMENT_DATA.splice(id , 1);
        this.chapterService.deleteChapter(id).subscribe( (res: any) => {
          console.log(res);
          this.refreshNgOninit();
        });
        console.log(id);
      }
      else{
        console.log('Done chhe bro');
      }
    });

  }

  
  refreshNgOninit(): void{
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }
  clearValueFromSearch(): void{
    setTimeout(() => {
      this.ngOnInit();
    }, 1);
  }
  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeAt(id: any): void{
    // const sss = this.ELEMENT_DATA.splice(id - 1, 1);
    console.log(id);
    console.log(this.ELEMENT_DATA);
}
}


