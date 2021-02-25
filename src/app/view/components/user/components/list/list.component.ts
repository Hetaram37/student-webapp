import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userList = [];
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  updateUser(id) {
    this.router.navigate(['/update', id]);
  }

  removeuser(id) {
    this.router.navigate(['/delete', id]);
  }

  seeUser(id) {
    this.router.navigate(['/get', id]);
  }

  getUserList() {
    this.userService.userList().subscribe(response => {
      this.userList = response['data'];
    }, error => {
      throw error;
    });
  }

  addNewUser() {
    this.router.navigate(['/add']);
  }


}
