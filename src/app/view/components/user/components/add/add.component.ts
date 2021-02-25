import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addUserForm: FormGroup;
  public success: string;
  public fail: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      first_name: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z \-\']+')
      ]],
      last_name: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z \-\']+')
      ]],
      email: [null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.email
      ]]
    });
  }

  get first_name() { return this.addUserForm.get('first_name'); }
  get email() { return this.addUserForm.get('email'); }
  get last_name() { return this.addUserForm.get('last_name'); }

  onSubmit() {
    this.success = null;
    this.fail = null;

    // Mark all fields as touched to check if we have missed any field
    this.addUserForm.markAllAsTouched();
    if (this.addUserForm.valid) {

      this.userService.addUser(this.addUserForm.value).subscribe(response => {
        if (response && response['data']) {
        }
      }, error => {
        if (error && error.error && error.error.status_code && error.error.status_code.includes('400') || error.error.status_code.includes('206')) {
          console.error(error.error.status_message, 'error')
        } else {
          console.error('Something went wrong', 'error')
        }
        throw error;
      })
    }
  }

  getList() {
    this.router.navigate(['/list']);
  }
}
