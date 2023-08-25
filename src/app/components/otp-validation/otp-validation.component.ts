import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpValidationService } from 'src/app/services/otp-validation.service';



@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OtpValidationComponent {
  otp:any;
  timer = true;
  incorrectOTP = false;
  userMobile:any;
  
  @ViewChild('cd') countdown!: CountdownComponent;
  @ViewChild('default') defaultTemplate!: TemplateRef<any>;
  @ViewChild('otpInput') ngOtpInput!: NgOtpInputModule; 
  
  // configuration of counter and input field
  configcd: CountdownConfig = { leftTime: 30, format: 'mm:ss' };
  config = { allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false };
  

  constructor(private router: Router, private modal: NgbModal, private auth: AuthService, private otpVerify : OtpValidationService){ }

  ngOnInit(){
    this.otp = JSON.parse(localStorage['otpData']).data[0].GeneratedOTP;
    this.userMobile = JSON.parse(localStorage['UserLoginData']).mobile;
  }

  // when clock turn 0 resend button appear
  clockCounter(e: CountdownEvent) {
    if (e.left == 0){
      this.timer = false;
    }
  }

  
  // when clicked on resend button otp-generation service will be called and user will get another message
  async resend(){
    this.timer = true;
    // this.auth.otpgeneration(this.userMobile);
    // let result = await this.auth.otpgeneration(JSON.parse(localStorage['UserLoginData']))
    this.countdown.restart();
  }


  // otp validation when clicked on submit/continue
  async onSubmit(otpInput: any = ''){
    // if otp is required and pressed on submit matching the otp
    if(otpInput.currentVal){
      this.incorrectOTP = false;
      // if otp is correctly entered send the user to home page else open a message box 
      if(otpInput.currentVal == this.otp){
        let result = await this.otpVerify.verifyOTP(this.userMobile, otpInput.currentVal);
        console.log(result)
        localStorage["result"] = JSON.stringify(result)
        // this.router.navigate(['/home'], { replaceUrl: true });
      }else{
        this.open(this.defaultTemplate);
      }
      // if otp field is empty show otp required message
    }else{
      this.incorrectOTP = true
    }
  }

  open(template: TemplateRef<any> = this.defaultTemplate) {
    this.modal.open(template, { ariaLabelledBy: 'modal-basic-title' })
  }
}







  




