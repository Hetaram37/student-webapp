import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public httpClient: HttpClient,
    private router: Router
  ) { }

  linkGeneration(param1, param2) {
    const host = window.location.hostname;
    return param1.protocol + '://' + host + ':' + param1.port + param1.apiPrefix + param2;
  }

  loginUser(body) {
    const url = this.linkGeneration(environment.authMgmtService, environment.authMgmtService.loginUser);
    return this.httpClient.post(url, body, { responseType: 'json'});
  }

  signUpUser(body) {
    const url = this.linkGeneration(environment.authMgmtService, environment.authMgmtService.registerUser);
    return this.httpClient.post(url, body, { responseType: 'json'});
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
