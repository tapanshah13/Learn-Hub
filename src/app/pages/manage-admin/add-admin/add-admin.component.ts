import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  commonService: any;

  constructor(private router: Router, private adminService: AdminService, private route: ActivatedRoute) { }
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  readonly = false;
  isLoadingResults = true;
  headerName ='Add Admin';
  adminForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    googleLink: new FormControl('', [Validators.pattern(this.reg)]),
    twitterLink: new FormControl('', [Validators.pattern(this.reg)]),
    faceBookLink: new FormControl('', [Validators.pattern(this.reg)]),
    aboutMe: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
    isActive: new FormControl('', Validators.required)
  })
  url = ''
  fileName = ''
  length: number = 0;
  adminId: string | null = '';
  adminInfo: any;
  // buttonName: string = 'View';
  ngOnInit(): void {
    this.adminId = this.route.snapshot.paramMap.get('id');
    if (this.adminId != null) {
      this.headerName = 'Edit Admin';
      this.adminService.getAdminInfo(this.adminId).subscribe((res: any) => {
        this.adminInfo = res.data;
        console.log(this.adminInfo);
        this.isLoadingResults = false
        this.readonly = true;
        this.adminForm.get('firstName')?.setValue(this.adminInfo.firstName);
        this.adminForm.get('lastName')?.setValue(this.adminInfo.lastName);
        this.adminForm.get('email')?.setValue(this.adminInfo.email);
        this.adminForm.get('googleLink')?.setValue(this.adminInfo.googleLink);
        this.adminForm.get('twitterLink')?.setValue(this.adminInfo.twitterLink);
        this.adminForm.get('faceBookLink')?.setValue(this.adminInfo.faceBookLink);
        this.adminForm.get('aboutMe')?.setValue(this.adminInfo.aboutMe);
        this.adminForm.get('imageUrl')?.setValue(this.adminInfo.imageUrl);
        this.adminForm.get('isActive')?.setValue(this.adminInfo.isActive);
      })
    }
  }

  
  onSelectImage(event: any): void {
    console.log(event);
    this.length = event.target.files.length;
    if (this.length === 1) {
      const reader = new FileReader();
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        this.url = event.target.result;
        // console.log(this.url)
      };
    } else {
      this.fileName = 'No file choosen';
      this.url = '';
    }
  }
  viewImage() {
    // this.visibleImage = !this.visibleImage;
    // if (this.visibleImage)
    //   this.buttonName = "Hide";
    // else
    //   this.buttonName = "View";
    let newTab = window.open('', '_blank');
    newTab?.document.write(`<html><title>Image Preview</title><body><image src =${this.url}></body></html>`);
    newTab?.document.close();
  }


  onSave() {
    console.log(this.adminForm.value);
    var formData: any = new FormData();
    formData.append('firstName', this.adminForm.get('firstName')?.value);
    formData.append('lastName', this.adminForm.get('lastName')?.value);
    formData.append('email', this.adminForm.get('email')?.value);
    formData.append('aboutMe', this.adminForm.get('aboutMe')?.value);
    formData.append('googleLink', this.adminForm.get('googleLink')?.value);
    formData.append('faceBookLink', this.adminForm.get('faceBookLink')?.value);
    formData.append('twitterLink', this.adminForm.get('twitterLink')?.value);
    formData.append('isActive', this.adminForm.get('isActive')?.value);
    formData.append('adminType', 0);
    formData.append('Designation', '');
    if (this.adminId == null) {
      formData.append('url', 'https://vidhya-admin.viitorcloud.in/')
      console.log(formData);
      this.adminService.createAdmin(formData).subscribe(res => {
        console.log(res);
        this.router.navigate(['manage-admin'])
      })
    } else {
      formData.append('status', this.adminForm.get('isActive')?.value);
      formData.append('id', this.adminId);
      this.adminService.updateAdminInfo(formData).subscribe(res => {
        console.log(res);
        this.router.navigate(['manage-admin'])
      })
    }
  }
  onCancel() {
    this.router.navigate(['manage-admin']);
  }

}


function id(id: any) {
  throw new Error('Function not implemented.');
}

