import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;
  loginInvalid = false;
  fail: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  ngOnInit(): void {
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    this.fail = undefined;
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value)
      .pipe(first())
      .subscribe({
          next: response => {
              localStorage.setItem('user_id', response['data']['userId']);
              localStorage.setItem('email', response['data']['email']);
              localStorage.setItem('token', response['data']['token']);
              localStorage.setItem('name', response['data']['name']);
              localStorage.setItem('exp_time', response['data']['expireAt']);
              this.router.navigate([response['data']['path']]);
          },
          error: error => {
            this.fail = error.error.errors;
            throw error;
          }
      });
    }
  }

  togglePasswordType() {
    this.hidePassword = !this.hidePassword;
  }

  needToRegister() {
    this.router.navigate(['/register']);
  }
}
