import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../module-service/modules.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { findIndex, map, startWith } from 'rxjs/operators';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, CdkDrag } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

// tslint:disable-next-line: class-name
interface modulearr{
  chName: string;
  moduleTime: number;
}

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit {
  dataSource: any;
  id: any;
  ckeditorContent: any;
  myControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  module = '';
  chName = '';
  time = '';
  modulearr: any = [];
  srno = 1;
  totnum = 0;
  chapterId = '' ;
  moduleTime = 0;
  param: any;
  _id: any;
  data: any [] = [];
  totalDuration = 0;
  chapter: any;
  findex: any;
  headerId = '';
  headerEdit = '';
  enableExam = false;
  passExamIndex = 2;
  constructor(public moduleService: ModulesService, private dialog: MatDialog, private route: ActivatedRoute,
              private toastr: ToastrService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.headerId = this.route.snapshot.params.id;
    this.headerEdit = this.route.snapshot.params.edit;
    this.moduleService.headerEdit = this.headerEdit;

    this.moduleService.id = this.headerId;
    this.moduleService.displayChapter().subscribe((res: any) => {
        console.log('display ts', res);
        res.data.forEach((ele: any) => {
          this.data.push(ele);
        });
      });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    if (this.headerId !== null){
      this.moduleService.viewModules().subscribe((result: any) => {
        // console.log('view module 64', result.data[0]);
        this.toastr.error('There is no chapter in list...');
        for (let i = 0; i < result.data[0].chapterId.length; i++){
          console.log(result.data[0].chapterId[i].name);
          this.totnum += result.data[0].chapterId[i].duration;
          this.moduleTime = this.totnum;
          this.moduleService.editChapId.push(result.data[0].chapterId[i]._id);
          this.modulearr.push({moduleTime: result.data[0].chapterId[i].duration, chName: result.data[0].chapterId[i].name});
          console.log(this.modulearr);
        }
      });
    }
  }

  // function for dropdown option
  getName(chName: any): void{
    console.log(chName);
    this.findex = this.data.findIndex((ele: any) => {
      return ele.name === chName;
    });
    // console.log()
    // console.log((this.modulearr.findIndex((ele: any) => { return ele.chName === chName; }))==-1);
    if ((this.modulearr.findIndex((ele: any) => {
      return ele.chName === chName; })) === -1) {
      console.log('this.findex ::::::  ', this.data[this.findex]);
      this.moduleService.chapterId.push(this.data[this.findex]._id.toString());
      this.moduleService.editChapId.push(this.data[this.findex]._id.toString());
      console.log('module id in chapter', this.moduleService.chapterId);
      this.totnum += this.data[this.findex].duration;
      this.moduleTime = this.totnum;
      this.modulearr.push({ moduleTime: this.data[this.findex].duration, chName: this.chName });
      console.log('Module detail', this.modulearr);
    }
    else{
      console.log('else part');
      alert('Already Added');
    }
  }

  private _filter(value: string): modulearr[] {
    const filterValue = value.toLowerCase();
    return this.data.filter((option: { name: { toString: () => string; }; }) => option.name.toString()
    .toLowerCase().indexOf(filterValue) === 0);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.modulearr, event.previousIndex, event.currentIndex);
  }
  onDeleteofModule(indexID: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'Chapter', description: 'chapter'};
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const chapterName = this.modulearr[indexID].chName;
        console.log(chapterName);
        const i = this.data.findIndex((ele) => {
          return ele.name === chapterName;
        });
        this.totnum -= this.modulearr[indexID].moduleTime;
        if (this.headerEdit ===  'edit'){
          this.moduleService.editChapId.splice(this.moduleService.chapterId.findIndex(ele => ele === this.data[i]._id), 1);
        }
        else{
          this.moduleService.chapterId.splice(this.moduleService.chapterId.findIndex(ele => ele === this.data[i]._id), 1);
        }
        this.modulearr.splice(indexID, 1);
      }
    });
  }

  enableNextTab(): void{
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.moduleService.editChapId.length; i++){
      if ((this.data.findIndex((ele: any) => {
        return ele._id === this.moduleService.editChapId[i]; })) === -1){
      }
    }
    this.moduleService.addChapter(this.moduleTime).subscribe((res: any) => {
      console.log('add chapter', res);
    });
    this.moduleService.enableModuleExam.next(this.enableExam);
    this.moduleService.selectedIndex.next(this.passExamIndex);
    this.toastr.success('Chapter Added Successfully');
  }
}
