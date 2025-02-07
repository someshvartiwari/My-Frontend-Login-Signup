import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  passwordFieldType: string = 'password';
  loginForm!:FormGroup;

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(private apiservice:ApiService){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log('Form Data:', this.loginForm.value);
     this.validatelogindetail(this.loginForm.value.email,this.loginForm.value.password); 
    } else {
      // console.log('Invalid Form');
    }
  }

  validatelogindetail(email:string,password:string){
    let payload={
      "email":email,
      "password":password
    }
    this.apiservice.loginuserdetail(payload).subscribe(data=>{
    // console.log(data)
    let responses:any=data;
    if (responses.success) {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
       window.alert(responses.message);
    } else {
      window.alert(responses.message);
    }
    },
  error=>{
    // console.log(error)
    let errormessage:any=error
    window.alert(errormessage.error.message);
  })
  }

}
