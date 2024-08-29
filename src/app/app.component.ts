import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from './shared/shared-service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vidhya';
  demo: any;
  mobileQuery: any

  sideBarOpen = true;

  private mobileQueryListener: () => void;
  constructor(private commonService: SharedService, private router: Router, private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
                this.mobileQuery = media.matchMedia('(max-width: 1000px)');
                this.mobileQueryListener = () => changeDetectorRef.detectChanges();
                this.mobileQuery.addListener(this.mobileQueryListener);
                this.sideBarOpen = true
               }
  // isLoggedIn: boolean = this.commonService.isLoggedIn();
  isLoggedIn = false;
  headerButton: any
  header1 =  true
  header =  false
  ngOnInit(): void {
    this.demo = this.activatedRoute.snapshot.params;
    console.log('DEMO------', this.demo);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.activatedRoute?.firstChild?.snapshot.data.isLoggedIn !== false;
      }
    });
    this.headerButton = window.innerWidth
    console.log(this.headerButton)
    if(this.headerButton < 1000){
      console.log(this.headerButton)
      this.header1 = false
      this.header = true
      this.sideBarOpen = false
    }
  }

  sideBarToggler(event: any): void{
    this.sideBarOpen = !this.sideBarOpen;
  }
}
