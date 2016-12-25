import { Injectable, Inject } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

import { LocalStorageService } from './localStorage.service';
import { InstagramImage } from './image/image';

const CLIENT_ID = '26a0c4deeae848fcb39560da8573e67a',
    API_BASE = 'https://api.instagram.com';



@Injectable()
export class InstagramService {
    private access_token: string;
    login_url: string;

    constructor( @Inject(PlatformLocation) location: PlatformLocation, private jsonp: Jsonp, private localStorage: LocalStorageService) {
        this.login_url = `${API_BASE}/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${document.location.protocol}//${document.location.host}${location.getBaseHrefFromDOM()}&response_type=token&scope=basic+public_content`;

        let hash_parsed = (location.hash || '#').substring(1).split('&').reduce((h, curr) => {
            let k = curr.split('=');
            h[k[0]] = k[1];
            return h;
        }, {});

        this.access_token = hash_parsed['access_token'];
    }

    isLoggedIn() {
        return this.access_token ? true : false;
    }

    getLastTags() {
        if (!this.isLoggedIn()) return Observable.throw("Not logged in!");
        return this.localStorage.getLastTags();
    }

    searchTag(tag: string): Observable<InstagramImage[]> {
        if (!this.isLoggedIn()) return Observable.throw("Not logged in!");
        if (!tag) return Observable.throw("Tag required");

        let freshData = this.jsonp.get(`${API_BASE}/v1/tags/${tag}/media/recent?count=20&access_token=${this.access_token}&callback=JSONP_CALLBACK`)
            .map((res: Response) => {
                let data = res.json().data.map(img => ({ link: img.link, src: img.images.low_resolution.url, caption: img.caption.text }));
                this.localStorage.updateTag(tag, data);
                return data;
            })
            .catch(this.handleError);
        
        return Observable.from([this.localStorage.getTag(tag), freshData]).switch();
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
