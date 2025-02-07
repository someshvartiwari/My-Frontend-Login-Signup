import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  passwordFieldType: string = 'password';
  signupForm: FormGroup;
  countries: string[] = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'Brazil'
  ];

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(private fb: FormBuilder, private apiservice:ApiService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['India', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  
  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.saveuserdetail(this.signupForm.value.firstName,this.signupForm.value.lastName,this.signupForm.value.dob,this.signupForm.value.gender,this.signupForm.value.email,this.signupForm.value.password,this.signupForm.value.country,this.signupForm.value.mobileNumber);
    } else {
      console.log('Form is invalid');
    }
  }

  saveuserdetail(firstname: string, lastname: string, dob: string, gender: string, email: string, password: string, country: string, mobno: string) {
    let payload = {
      "firstname": firstname,
      "lastname": lastname,
      "dob": dob,
      "gender": gender,
      "email": email,
      "password": password,
      "country": country,
      "mobilenumber": mobno
    };
  
    this.apiservice.saveuserdetail(payload).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Show success message to the user
          alert("User registered successfully!");
          this.signupForm.reset();
        } else {
          // Handle cases where the response is false but still a 200 OK status
          alert(response.message || "Something went wrong!");
        }
      },
      error: (error) => {
        if (error.status === 409) {
          alert("User already exists. Please try logging in.");
        } else if (error.status === 400) {
          alert("Invalid input! Please check your details.");
        } else if (error.status === 500) {
          alert("An unexpected error occurred. Please try again later.");
        } else {
          alert("Something went wrong! Please try again.");
        }
      }
    });
  }
  




}
