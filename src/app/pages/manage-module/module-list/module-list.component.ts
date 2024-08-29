import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogboxComponent } from 'src/app/shared/dialogbox/dialogbox.component';
// import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

export interface ModuleDetails {
  srNo: number;
  moduleName: string;
  addedBy: string;
  time: number;
  totalAttempt: number;
  timePeriod: number;
  createdDate: string;
  updatedDate: string;
  status: string;
}

const ELEMENT_DATA: ModuleDetails[] = [
  { srNo: 1, moduleName: 'NodeJs API', addedBy: 'Jaydeep', time: 150, totalAttempt: 2, timePeriod: 2, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 2, moduleName: 'Merkle Tree', addedBy: 'Kevin', time: 120, totalAttempt: 1, timePeriod: 3, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 3, moduleName: 'Bitcoin Transaction', addedBy: 'Kevin', time: 250, totalAttempt: 3, timePeriod: 2, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 4, moduleName: 'Blockchain feature', addedBy: 'Kevin', time: 100, totalAttempt: 4, timePeriod: 2, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 5, moduleName: 'bitcoinlib', addedBy: 'Tapan', time: 180, totalAttempt: 5, timePeriod: 5, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 6, moduleName: 'Bootstrap4', addedBy: 'Pareshbhai', time: 90, totalAttempt: 3, timePeriod: 6, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 7, moduleName: 'Angular Routing', addedBy: 'Jay', time: 160, totalAttempt: 4, timePeriod: 3, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 8, moduleName: 'Angular Hooks', addedBy: 'Priyanshee', time: 150, totalAttempt: 5, timePeriod: 4, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 9, moduleName: 'React Hooks', addedBy: 'Vishal', time: 190, totalAttempt: 2, timePeriod: 5, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
  { srNo: 10, moduleName: 'Unity', addedBy: 'Akash', time: 200, totalAttempt: 3, timePeriod: 6, createdDate: 'April 28,2021', updatedDate: 'April 29, 2021', status: 'Active' },
];
@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit, AfterViewInit {


  constructor(private dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ModuleDetails>;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.dataSource = new MatTableDataSource<ModuleDetails>(ELEMENT_DATA);
  }
  ngAfterViewInit(): void {
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  search(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue;
  }
  displayedColumns: string[] = ['srNo', 'moduleName', 'addedBy', 'time', 'totalAttempt', 'timePeriod', 'createdDate', 'updatedDate', 'status', 'actions'];


  deleteRecord(id: number) {
    const dialogRef = this.dialog.open(DialogboxComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log(id);
        this.dataSource.data.splice(id - 1, 1);
        this.refreshPage();

      }

    });
  }

  //****** Delete using sweeralert ******//
  // Swal.fire({
  //   title: 'Are you sure want to remove?',
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, delete it!',
  //   cancelButtonText: 'No, keep it'
  // }).then((result) => {
  //   if (result.value) {
  //     this.dataSource.data.splice(id-1,1);
  //     console.log(this.dataSource.data.keys())
  //     // ELEMENT_DATA.splice(id-1,1);

  //     Swal.fire(
  //       'Deleted!',
  //       'Reocrd has been deleted.',
  //       'success'

  //     )
  //     this.refreshPage();
  //   } else if (result.dismiss === Swal.DismissReason.cancel) {
  //     Swal.fire(
  //       'Cancelled',
  //       'Your Record is safe :)',
  //       'error'
  //     )
  //   }
  // })

refreshPage(){
  setTimeout(() => { this.ngOnInit(); }, 1000)
}
}
