import { AuthenticationService } from './../Services/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({providedIn : 'root'})

export class AuthGuardGuard implements CanActivate {
    constructor(public auth: AuthenticationService, public router: Router) {}
     canActivate(): boolean {
            if (!this.auth.isAuthenticated()) {
                 //this.router.navigate(['Login']);
                 console.log('You are not authorised to view this page')
                 return false;
            }
            return true;
     }
}
