import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtpValidationService {

  constructor(private http: HttpClient) { }


  async verifyOTP(mobile:any, otp:any){
    let queryParams: any = {};

    queryParams["MobileNo"] =  mobile;
    queryParams ["GeneratedOTP"] = otp;

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    };

    let res = await this.http.post("https://www.hamarabima.com/apibikanercallcenter/api/OTPVerification", JSON.stringify(queryParams), httpOptions).toPromise()

    return res
  }
}
