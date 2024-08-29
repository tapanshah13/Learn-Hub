import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import { ChapterService } from '../chapter-service/chapter.service';
import {MatDialogConfig} from '@angular/material/dialog'

export interface PeriodicElement {
  SrNo: number;
  question: string;
  questionType: string;
  createdAt: string;
  status: number;
}
@Component({
  selector: 'app-chapter-questions',
  templateUrl: './chapter-questions.component.html',
  styleUrls: ['./chapter-questions.component.scss']
})
export class ChapterQuestionsComponent implements OnInit{

  ELEMENT_DATA: PeriodicElement[] = [ ];
  value: any;

  chapterDetail: any = [];
  questionDetail: any = [];

  chapterId: any;
  header: any;
  headerAdd: any;
  chapterName: any;
  chapterDuration: any;
  chapterDescription: any;
  params: any;
  displayedColumns: string[] = ['SrNo', 'question', 'questionType', 'createdAt', 'status', 'action'];

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  constructor(private chapterService: ChapterService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              public transalte: TranslateService) {

   }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // this.header = this.route.snapshot.params.edit;
    this.headerAdd = this.route.snapshot.params.add;
    this.chapterId = this.route.snapshot.params.id;
    this.params = this.route.snapshot.paramMap.get('id');
    console.log(this.header);
    console.log(this.chapterId);

    this.chapterService.vidhyaDemo().subscribe((result: any) => {
      if (this.chapterId === this.params){
        for (const i of result.data){
          if (i._id === this.chapterId){
            this.chapterDetail = i;
          }
        }
      }
      else{
        // tslint:disable-next-line: no-shadowed-variable
        this.chapterService.passChapNameToQues.subscribe(result => {
          this.chapterName = result;
        });
        this.chapterService.passChapdurationToQues.subscribe(res => {
          this.chapterDuration = res;
        });
        this.chapterService.passChapDesToQues.subscribe(response => {
          this.chapterDescription = response;
        });
        this.chapterService.passIdToQues.subscribe(res => {
          this.chapterId = res;
          console.log('this is chapter ID', this.chapterId);
        });
      }
      // tslint:disable-next-line: no-shadowed-variable
  });
    this.chapterService.questionList(this.chapterId).subscribe((result: any) => {
    this.questionDetail = result;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.questionDetail.data);
    this.dataSource.paginator =  this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
  });
  }

  refreshNgOninit(): void{
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }
  openDialog(questionId: any): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'Chapter', description: 'chapter'};
    dialogConfig.disableClose = true;
    const elementRef = this.dialog.open(DialogboxComponent, dialogConfig);
    // tslint:disable-next-line: deprecation
    elementRef.afterClosed().subscribe(result => {
      if (result === 'true'){
        console.log('remove function work');
        this.chapterService.deleteQuestion({ id : questionId}).subscribe( (res: any) => {
          console.log(res);
          this.refreshNgOninit();
        });
        console.log(questionId);
      }
      else{
        console.log('Done chhe bro');
      }
    });

  }
  clearValueFromSearch(): void{
    setTimeout(() => {
      this.ngOnInit();
    }, 1);
  }
  applyFilter(event: Event): any{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeAt(id: any): void{
    const sss = this.ELEMENT_DATA.splice(id - 1, 1);
    console.log(sss);
    console.log(this.ELEMENT_DATA);
}
}
