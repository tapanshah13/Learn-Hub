import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import { AdminService } from './admin-service/admin.service';
export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  adminType: string;
  isActive: string;
}
@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageAdminComponent implements OnInit {
  constructor(private dialog: MatDialog, private adminService: AdminService, public transalte: TranslateService,
              private commonService: SharedService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // dataSource!: MatTableDataSource<UserDetails>;
  dataSource = new MatTableDataSource<UserDetails>();
  length = 0;
  isLoadingResults = true
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['srNo', 'firstName', 'lastName', 'email', 'adminType', 'isActive', 'actions'];

  ngOnInit() {
    this.adminService.getAdminList().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.isLoadingResults = false;
      this.dataSource.paginator = this.paginator;
      // console.log(this.paginator.pageSize)
      // console.log(this.paginator.pageIndex)
      const paginatorIntl = this.paginator._intl;
      paginatorIntl.nextPageLabel = 'Next Page';
      paginatorIntl.previousPageLabel = 'Previous Page';
      this.dataSource.sort = this.sort;

    })
  }
  search(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }


  deleteAdmin(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'Admin', description: 'admin'};
    dialogConfig.disableClose = true;
    // dialogConfig.hasBackdrop = false;
    let dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.adminService.deleteAdmin(id).subscribe((res: any) => {
          console.log(res);
          console.log(id);
          this.refreshPage();
        })
      }
    });
  }
  refreshPage() {
    setTimeout(() => { this.ngOnInit(); }, 1000)
  }

}
