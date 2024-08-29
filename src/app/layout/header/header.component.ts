import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared-service/shared.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  // @Output() sideBarToggler: EventEmitter<any> = new EventEmitter();
  headerButton: any
  header = false
  // constructor(private router: Router, public sharedService: SharedService) { }
  @Output() sideBarToggler: EventEmitter<any> = new EventEmitter();
  switchLang = '';
  browserLang: any;
  constructor(private router: Router, public sharedService: SharedService, public transalte: TranslateService) {
    this.sharedService.selectedLang.subscribe(res => {
      this.switchLang = res;
      transalte.addLangs(['de', 'en']);
      transalte.setDefaultLang('en');
      transalte.use(this.switchLang);
    });
    this.browserLang = transalte.getDefaultLang();
    this.languageChanged();
    // console.log(this.browserLang);
    this.sharedService.selectedLang.next(this.browserLang);
  }

  ngOnInit(): void {
    this.headerButton = window.innerWidth
    console.log(this.headerButton)
    if(this.headerButton < 1000){
      console.log(this.headerButton)
      this.header = true
    }
  }

  selectedLanguage(lang: string): void{
    console.log(lang);
    this.sharedService.selectedLang.next(lang);
  }
  languageChanged(): void{
    this.transalte.use(this.browserLang.match(/en|de/) ? this.browserLang : 'en');
  }


  toggleSideBar(): void{
    this.sideBarToggler.emit();
  }
  signOut(): void{
    this.sharedService.signOut();
  }
}
