import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  private API_URL = 'https://api-vidhya.viitorcloud.in/admin/';

  getAdminList(): Observable<any> {
    return this.http.get(`${this.API_URL}list`);
  }
  getAdminInfo(id: string | null): Observable<any> {
    return this.http.get(`${this.API_URL}adminInfo/${id}`)
  }
  createAdmin(formData: any): Observable<any> {
    return this.http.post(`${this.API_URL}create`, formData)
  }
  updateAdminInfo(formData: any): Observable<any>{
    return this.http.post(`${this.API_URL}update`, formData)
  }
  deleteAdmin(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}delete/${id}`);
  }
  changePassword(userData: any){
    return this.http.post(this.API_URL + 'changePassword', userData)
  }
}
