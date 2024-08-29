import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  constructor(private _route: Router, private _http: HttpClient) { }
  enableModuleChapter = new Subject<boolean>();
  enableModuleExam = new Subject<boolean>();
  selectedIndex = new Subject<number>();
  param: any;
  headerEdit = '';
  chapterId: string[] = [];
  editChapId: string[] = [];
  newChapId: string[] = [];
  editmoduleId = '';
  id = '';

  private url = 'https://api-vidhya.viitorcloud.in/admin';

  redirectToModule(): any{
    this._route.navigate(['manage-module']);
  }
  createModule(moduleDetails: any): any{
    // console.log(moduleDetails);
    return this._http.post(this.url + '/module/saveModule', moduleDetails);
  }
  viewModules(): any{
    console.log('chapter arra', this.chapterId);
    return this._http.post(this.url + '/module/viewModule', {id : this.id});
  }
  displayChapter(): any{
    return this._http.get(this.url + '/chapter/display');
  }
  addChapter(moduleTime: any): any{
    console.log(this.id);
    return this._http.post(this.url + '/module/moduleAddChapter', { id: this.id, chapterId:
      this.headerEdit === 'edit' ? this.editChapId : this.chapterId, moduleTime : moduleTime });
  }
  updateModule(formData: any): any{
  return this._http.post(this.url + '/module/updateModule', formData);
  }
  editModuleExam(): any{
    return this._http.get('https://api-vidhya.viitorcloud.in/admin/module/editModuleExam/' + this.editmoduleId);
  }
  addExam(createExam: any) {
    // console.log("display exam")
    return this._http.post(this.url + '/module/saveModuleExam', createExam);
  }
  updateExam(formdata: any): any{
    return this._http.post(this.url + '/module/updateModuleExam', formdata);
  }
  getModuleDetail() {
    return this._http.get('https://api-vidhya.viitorcloud.in/admin/module/getModules');
  }
  deleteModule(moduleId: string) {
    return this._http.post('https://api-vidhya.viitorcloud.in/admin/module/deleteModule', { 'id': moduleId });
  }
}




