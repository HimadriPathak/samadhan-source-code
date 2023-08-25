import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  result: any;
  constructor( private fb: FormBuilder, private router: Router, private auth: AuthService){
    // this tells that both the field is necessary
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      mobile: ['', Validators.required]
    })
  }

  ngOnInit(){
    if(localStorage["UserLoginData"]){
          this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  async onSubmit(){
    if(this.loginForm.valid){
      try{
        this.result = await this.auth.otpgeneration(this.loginForm.value)
        console.log(this.result)
        if(this.result.msg == 'success'){
          localStorage["UserLoginData"] = JSON.stringify(this.loginForm.value)
          localStorage["otpData"] = JSON.stringify(this.result)
          this.router.navigate(['/otp-validation'], { replaceUrl: true });

        }else{
          alert(this.result.msg);
          this.loginForm.reset()
        }
      }catch (err){
        alert(err);
        this.loginForm.reset()
      }

      
    }else{
      this.validateAllFormFields(this.loginForm)
    }
  }

  private validateAllFormFields(formGroup : FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if( control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }


}
