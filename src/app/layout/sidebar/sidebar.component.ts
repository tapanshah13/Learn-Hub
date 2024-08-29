import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared-service/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  title = 'vidhya';

  sideBarOpen = true;
  constructor(private commonService: SharedService) { }
  isLoggedIn: boolean = this.commonService.isLoggedIn();
  ngOnInit(): void {
  }

  sideBarToggler(event: any): void{
    this.sideBarOpen = !this.sideBarOpen;
  }
}
