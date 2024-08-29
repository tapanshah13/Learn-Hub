import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service: AdminService) { }
  hide = true;
  data: any
  Password: any

  ngOnInit(): void {
  }
  onSubmit(changePassword: NgForm){
    console.log(changePassword)
    this.data = changePassword  
    if (this.data.password === this.data.confirmPassword){
      // console.log(this.data.password)
      this.Password = Object.assign({password: this.data.password})
      console.log(this.Password)
      this.service.changePassword(this.Password).subscribe((res: any) => {console.log(res)})
  }

}
}
