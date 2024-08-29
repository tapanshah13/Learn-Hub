import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor(private authService: AuthService, private commonService: SharedService, private router: Router,
              private toastr: ToastrService) {
    if (this.commonService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  email: string | undefined;
  password: string | undefined;

  ngOnInit() { }

  login(): void {
    const userData = { "email": this.email, "password": this.password }
    this.authService.login(userData).subscribe((res: any) => {
      console.log(res);
      this.commonService.userToken = res.token;
      // localStorage.setItem('res',res.admin._id);   //profile
      localStorage.setItem('token', `${this.commonService.userToken}`)

      if (res.message == "Successfully Login") {
        console.log(res.message);
        this.router.navigate(['dashboard']);
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
      if (err.status === 401 || err.status == 404) {
        this.toastr.error('Please enter valid email or password');
      }
    });
  }
}
