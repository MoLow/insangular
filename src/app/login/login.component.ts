import { Component, OnInit } from '@angular/core';

import { InstagramService } from '../instagram.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    url: string;

    constructor(private instagram: InstagramService) {
        this.url = this.instagram.login_url;
    }

    ngOnInit() {
    }

}
