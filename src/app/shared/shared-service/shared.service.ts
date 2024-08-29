import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
selectedLang = new BehaviorSubject('en');
constructor(private toastr: ToastrService, private router: Router) { }

showSuccess(message: string): void{
    this.toastr.success(message);
}

showError(message: string): void{
    this.toastr.error(message);
}

showInfo(message: string, title: string): void{
    this.toastr.info(message, title);
}

showWarning(message: string, title: string): void{
    this.toastr.warning(message, title);
}
isLoggedIn(){
  return !!localStorage.getItem('token');
  }
get userToken(){
  return localStorage.getItem('token') as string;
  }
set userToken(value: string){
  localStorage.setItem('token', value);
  }
signOut() {
  window.localStorage.clear();
  this.router.navigate(['login']);
  }
}
