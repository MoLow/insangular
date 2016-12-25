import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { InstagramService } from '../instagram.service';

@Injectable()
export class LoginService implements CanActivate {

    constructor(private router: Router, private instagram: InstagramService) { }

    canActivate() {
        if (this.instagram.isLoggedIn())
            return true;
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
