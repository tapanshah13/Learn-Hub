import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import { DashboardService } from './dashboard-service/dashboard.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData: any;


  constructor(private getDashboard: DashboardService, private commonService: SharedService,  public transalte: TranslateService) {
  }
  ngOnInit(): void {
    this.getDashboard.getDashboard().subscribe((res: any) => {
      this.dashboardData = res;
      console.log(this.dashboardData);
    }
    );
  }
}
