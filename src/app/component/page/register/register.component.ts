import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tel: ['', [Validators.required]],
      prefix: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      try {
        const response = await this.authService.register(this.registrationForm.value);
        console.log('Registration successful', response);
      } catch (error) {

        console.error('Registration failed', error);
      }
    }
  }
}
