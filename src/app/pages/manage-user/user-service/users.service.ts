import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = 'https://api-vidhya.viitorcloud.in/user';
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  getUserList(): Observable<any>{
    return this.http.get(`${this.API_URL}/list`);
  }
  deleteUser(id: number): Observable<any>{
    return this.http.post(`${this.API_URL}/list/delete`,{'id':id})
  }
  getSingleUser(userId: any): Observable<any>{
    return this.http.post(`${this.API_URL}/list/getSingleUser`,{'id':userId});
  }
  updateUser(userDetail: any): Observable<any>{
    userDetail = JSON.parse(userDetail);
    return this.http.post(`${this.API_URL}/list/update`,userDetail);
  }
}
