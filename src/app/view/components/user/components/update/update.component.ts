import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';
import { User } from '../../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public addUserForm: FormGroup;
  public userId: String;
  public success: string;
  public fail: string;
  public userDetail: any;
  public user: User;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.userId = this.route.snapshot.paramMap.get('id'); }


  ngOnInit(): void {
    this.getUser();
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
      ]],
      fees: [null],
      class: [null]
    });
  }

  get first_name() { return this.addUserForm.get('first_name'); }
  get email() { return this.addUserForm.get('email'); }
  get last_name() { return this.addUserForm.get('last_name'); }
  get fees() { return this.addUserForm.get('fess'); }
  get class() { return this.addUserForm.get('class'); }

  getUser() {
    this.userService.getUser(this.userId).subscribe(response => {
      this.userDetail = response['data'];
      this.assignValues();
    }, error => {
      throw error;
    })
  }

  assignValues() {
    this.user = {
      first_name: this.userDetail.first_name,
      last_name: this.userDetail.last_name,
      email: this.userDetail.email,
      fees: this.userDetail.fees,
      class: this.userDetail.class
    }
  }

  onSubmit() {
    this.success = null;
    this.fail = null;

    // Mark all fields as touched to check if we have missed any field
    this.addUserForm.markAllAsTouched();
    
    if (this.addUserForm.valid) {
      this.userService.updateUser(this.addUserForm.value, this.userId).subscribe(response => {
        if (response && response['data']) {
          if (response && response['data']) {
            console.info('Student updated successfully', 'info');
          }
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
