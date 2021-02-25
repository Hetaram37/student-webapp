import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {

  userId: any;
  userDetail: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { 
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    this.userService.getUser(this.userId).subscribe(response => {
      this.userDetail = response['data'];
    }, error => {
      throw error;
    })
  }

  getList() {
    this.router.navigate(['/list']);
  }
}
