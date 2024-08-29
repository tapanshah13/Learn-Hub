import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../user-service/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService, private route: ActivatedRoute) { }
  userDetails: any;
  isLoadingResults = true
  userForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    isActive: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    // console.log('id', userId);
    this.userService.getSingleUser(userId).subscribe((res: any) =>{
      this.isLoadingResults = false
      this.userDetails = res.data; 
      this.userForm.get('id')?.setValue(this.userDetails._id);
      this.userForm.get('firstName')?.setValue(this.userDetails.firstName);
      this.userForm.get('lastName')?.setValue(this.userDetails.lastName);
      this.userForm.get('email')?.setValue(this.userDetails.email);
      this.userForm.get('isActive')?.setValue(this.userDetails.isActive);
    })
  }
  
  onSave(){
    console.log(this.userForm.value)
    let form = JSON.stringify(this.userForm.value);
    this.userService.updateUser(form).subscribe(res => {
      console.log(res);
      this.router.navigate(['manage-user']);
    })
  }
  onCancel() {
    this.router.navigate(['manage-user']);
  }
}