import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../view/components/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthenticated()) {
            // logged in so return true
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = localStorage.getItem('exp_time');
        const isExpired = new Date().toUTCString() < new Date(Number(expiresAt) * 1000).toUTCString();
        const userName = localStorage.getItem('name');
        const accessToken = localStorage.getItem('token');
        let authenticated = false;
        console.log('is expired: ', isExpired)
        
        if (isExpired && userName && accessToken) {
            authenticated = true;
        }
        return authenticated;
    }
}
