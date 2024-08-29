import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private httpClient: HttpClient) { }
  private API_SERVER = 'https://api-vidhya.viitorcloud.in';

  getDashboard() {
    return this.httpClient.get(this.API_SERVER + '/admin/dashboard');
  }
}
