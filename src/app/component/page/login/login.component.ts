import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'; // Assuming you have an AuthService for handling authentication

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const value = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }


    const login =await this.authService.login(value)
    try{
      console.log(login)
    }catch(err){
      console.log(err)
    }


  }
}
