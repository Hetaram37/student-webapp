import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  maxDOB = new Date();
  myGender = 'Male';
  hidePassword = true;
  success = false;
  hideConfirmPassword = true;
  fail: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, {
      updateOn: 'blur',
      validators: this.MustMatch('password', 'confirmPassword')
    });
  }

  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  ngOnInit(): void {
  }
  async onSubmit() {
    this.success = false;
    this.fail = false;
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      await this.authService.signUpUser(this.registrationForm.value).subscribe((response) => {
        this.success = true;
      },
      (error) => {
        this.fail = error.error.errors;
        throw error;
      });
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  togglePasswordType() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordType() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  needToLogin() {
    this.router.navigate(['/login']);
  }
}
