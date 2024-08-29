import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
import { UsersService } from './user-service/users.service';

export interface UserDetails {
  _id: string;
  firstName: string;
  email: string;
  isActive: string;
}

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageUserComponent implements OnInit {

  constructor(private dialog: MatDialog, private userService: UsersService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<UserDetails>();
  // dataSource!: MatTableDataSource<UserDetails>;
  @ViewChild(MatSort) sort!: MatSort;
  length = 0;
  isLoadingResults = true;
  displayedColumns: string[] = ['srNo', 'firstName', 'email', 'status', 'actions'];
  ngOnInit() {
    this.userService.getUserList().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.isLoadingResults = false;
      this.length = res.data.length;
      this.dataSource.paginator = this.paginator;
      const paginatorIntl = this.paginator._intl;
      paginatorIntl.nextPageLabel = 'Next Page';
      paginatorIntl.previousPageLabel = 'Previous Page';
      this.dataSource.sort = this.sort;
    })

  }

  search(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue;
  }

  deleteUser(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: 'User', description: 'user'};
    dialogConfig.disableClose = true;
    let dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log('id', id);
        this.userService.deleteUser(id).subscribe(res => {
          console.log('response', res);
          this.refreshPage();
        })
        // this.dataSource.data.splice(id, 1);
      }
    });
  }
  refreshPage() {
    setTimeout(() => { this.ngOnInit(); }, 500)
  }

}
