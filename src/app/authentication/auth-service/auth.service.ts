import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // userToken: string | undefined;
  // userToken: string | undefined;
  // userToken: string | undefined;
  userToken: string | undefined;
  // userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjVmOWY5YmYyMDJiN2RkMGQ0OGI0NTFmZCIsImVtYWlsIjoic2hydXRpc2hhaDk0MzdAZ21haWwuY29tIiwiaWF0IjoxNjIxODUxNzQ3LCJleHAiOjE2MjE4Njk3NDd9.9YzrrQfaJm3TrSc-mtbfDpFBCzR8qBm58kqN_n29cIs' = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjVmOWY5YmYyMDJiN2RkMGQ0OGI0NTFmZCIsImVtYWlsIjoic2hydXRpc2hhaDk0MzdAZ21haWwuY29tIiwiaWF0IjoxNjIxODUxNzQ3LCJleHAiOjE2MjE4Njk3NDd9.9YzrrQfaJm3TrSc-mtbfDpFBCzR8qBm58kqN_n29cIs";
  //for profile
  constructor(private httpClient: HttpClient) { }

  private API_SERVER = 'https://api-vidhya.viitorcloud.in';

  login(userData: any){
    return this.httpClient.post(this.API_SERVER + '/admin/login', userData);
  }

}
