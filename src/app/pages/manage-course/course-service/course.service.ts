import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  enableCourseModuleTab$ = new Subject<boolean>();
  redirectTab$ = new Subject<number>();
  enableCourseExamTab$ = new Subject<boolean>();
  tabHeader$ = new Subject<string>();
  newCourseId: string  = '';
  newModuleId: string[] = [];
  editCourseId: string | null = null;
  myParam: string = '';
  private API_SERVER = 'https://api-vidhya.viitorcloud.in/admin/';
  constructor(private _http: HttpClient) { }
  saveCourse(formData: any): Observable<any> {
    return this._http.post(this.API_SERVER + 'course/saveCourse', formData);
  }
  updateCourse(formData: any): Observable<any> {
    return this._http.post(this.API_SERVER + 'course/updateCourse', formData);
  }
  getSingleCourse(): Observable<any> {
    return this._http.post(this.API_SERVER + 'course/getSingleCourse', { 'id': this.editCourseId });
  }
  getModules(): Observable<any> {
    return this._http.get(this.API_SERVER + 'module/getModules');
  }
  displayModule(): Observable<any> {
    return this._http.get(this.API_SERVER + 'course/display/modules/' + this.editCourseId);
  }
  addModule(moduleId: string[], time: number): Observable<any> {
    return this._http.post(this.API_SERVER + 'course/addModule',
      {
        'id': this.myParam === 'add' ? this.newCourseId : this.editCourseId,
        'moduleId': moduleId, 'totalEstimatedTime': time
      })
  }
  getCourseExam(courseExamId: string) {
    return this._http.get(this.API_SERVER + 'course/exam/' + courseExamId);
  }
  getCourseModule() {
    return this._http.get(this.API_SERVER + 'course/display/modules/' + this.editCourseId);
  }
  addCourseExam(addResponse: any): Observable<any>{
    return this._http.post(this.API_SERVER + 'course/addCourseExam', addResponse);
  }
  updateCourseExam(updatedObj: any): Observable<any> {
    return this._http.post(this.API_SERVER + 'course/updateCourseExam', updatedObj);
  }
  updatePreReqCourse(updatedObj: any): Observable<any> {
    return this._http.post(this.API_SERVER + 'course/addRequisiteCourses', updatedObj);
  }
  deleteCourse(courseId: string): Observable<any> {
    return this._http.post(this.API_SERVER + 'course/deleteCourse', { 'id': courseId });
  }
  getCourseList(): Observable<any> {
    return this._http.get(this.API_SERVER + 'course/getCourse');
  }
}
