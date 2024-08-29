import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModulesService } from '../module-service/modules.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.scss']
})
export class ModuleCreateComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _router: Router, private moduleService: ModulesService, private route: ActivatedRoute,
              private toastr: ToastrService, private translate: TranslateService) { }
  model: any = {};
  ckeditorContent: any;
  header = '';
  headerEdit = '';
  moduleDetail: any;
  fatchedValue: any;
  enableChapter = false;
  passChapterIndex = 1;
  moduleAdd = new FormGroup({
    ModuleName: new FormControl('', Validators.required),
    ModuleDescription: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.header = this.route.snapshot.params.id;
    this.headerEdit = this.route.snapshot.params.edit;
    console.log(this.headerEdit);
    this.moduleService.id = this.header;
    if (this.headerEdit === 'edit'){
      this.moduleService.viewModules().subscribe((res: any) => {
        console.log(res);
        this.moduleDetail = res.data[0];
        this.moduleAdd.get('ModuleName')?.setValue(this.moduleDetail.ModuleName);
        this.moduleAdd.get('ModuleDescription')?.setValue(this.moduleDetail.ModuleDescription);
      });
    }
  }


  redirectToModule(): void{
    this.moduleService.redirectToModule();
  }
  enableNextTab(): void{
    const formdata = {
      ModuleName: this.moduleAdd.value.ModuleName,
      ModuleDescription: this.moduleAdd.value.ModuleDescription,
      id : this.header
    };
    console.log(formdata);
    if (this.headerEdit === 'edit'){
      this.moduleService.updateModule(formdata).subscribe((result: any) => {
        console.log(result);
      });
      console.log('something...');
      this.moduleService.selectedIndex.next(this.passChapterIndex);
      this.toastr.success('Module Created successfully...');
    }
    else{
      this.moduleService.createModule(this.moduleAdd.value).subscribe((res: any) => {
        this.moduleService.id = res.data._id;
      });
      this.moduleService.enableModuleChapter.next(this.enableChapter);
      this.moduleService.selectedIndex.next(this.passChapterIndex);
      this.toastr.success('Module Edit successfully...');
    }
  }
}


