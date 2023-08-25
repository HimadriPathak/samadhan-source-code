import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  async otpgeneration(user: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('MobileNo', user.mobile)
    let res = await this.http.get("https://www.hamarabima.com/apibikanercallcenter/api/OTPVerification", {params: queryParams}).toPromise()
    return res
  }
}
