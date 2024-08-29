import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { ModulesService } from './module-service/modules.service';
import { TranslateService } from '@ngx-translate/core';

export interface ModuleDetails {
  ModuleName: string;
  adminId?: {
    firstName: string,
    lastName: string,
    _id: string,
  };
  createdtAt: Date;
  updatedAt: Date;
  moduleExamId?: {
    examAttempt: number,
    examTimePeriod: number,
    _id: string
  };
  moduleTime: number;
  status: string;
  _id: string;
}

@Component({
  selector: 'app-manage-module',
  templateUrl: './manage-module.component.html',
  styleUrls: ['./manage-module.component.scss']
})
export class ManageModuleComponent implements OnInit {

  constructor(private dialog: MatDialog, private moduleService: ModulesService, private translate: TranslateService) { }
  displayedColumns: string[] = ['srNo', 'moduleName', 'addedBy', 'moduleTime', 'examAttempt', 'examTimePeriod', 'createdAt', 'updatedAt', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // dataSource!: MatTableDataSource<ModuleDetails>;
  dataSource = new MatTableDataSource<ModuleDetails>();
  length = 0;
  isLoadingResults = true;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void{

    this.moduleService.getModuleDetail().subscribe((res: any) => {
      console.log(res.data);
      this.dataSource = new MatTableDataSource(res.data);
      this.isLoadingResults = false;
      this.length = res.data.length;
      console.log(this.length);
      this.dataSource.paginator = this.paginator;
      const paginatorIntl = this.paginator._intl;
      paginatorIntl.nextPageLabel = 'Next Page';
      paginatorIntl.previousPageLabel = 'Previous Page';
      this.dataSource.sort = this.sort;
    });

  }
  search(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue;
  }
  deleteRecord(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'module', description: 'module'};
    dialogConfig.disableClose = true;
    const elementRef = this.dialog.open(DialogboxComponent, dialogConfig);
    elementRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.moduleService.deleteModule(id).subscribe(res => {
          console.log(res);
          this.refreshPage();
        });
      }
    });
  }
  refreshPage(): void {
    setTimeout(() => { this.ngOnInit(); }, 1000);
  }


}




