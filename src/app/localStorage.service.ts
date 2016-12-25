import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/never';
import 'rxjs/Rx';

import { InstagramImage } from './image/image';

const LS_KEY = 'INSTANGULAR';


@Injectable()
export class LocalStorageService {
    private lastTags: BehaviorSubject<string[]>;

    constructor() {
        this.lastTags = new BehaviorSubject<string[]>(this.get().last || []);
    }

    private get(): { last: string[], tags: { [ksy: string]: InstagramImage[] } } {
        try {
            return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
        } catch (e) {
            return { last: [], tags: {} };
        }
    }

    getTag(tagName: string): Observable<InstagramImage[]> {
        let cached = this.get();
        return Observable.of(tagName && cached && cached.tags && cached.tags[tagName] || []);// : Observable.of();
    }

    getLastTags(): Observable<string[]> {
        return this.lastTags.asObservable();
    }

    updateTag(tagName: string, images: InstagramImage[]) {
        let cached = this.get() || { last: [], tags: {} };
        cached.last = cached.last || [];
        cached.tags = cached.tags || {};

        if (cached.last.indexOf(tagName) === -1)
            cached.last.unshift(tagName);
        else {
            for (let i = cached.last.indexOf(tagName); i > 0; i--) { cached.last[i] = cached.last[i - 1]; }
            cached.last[0] = tagName;
        }
        cached.last = cached.last.slice(0, 5);

        cached.tags[tagName] = images || [];
        cached.tags = cached.last.reduce((tags, tag) => { tags[tag] = cached.tags[tag]; return tags; }, {});

        this.lastTags.next(cached.last);

        localStorage.setItem(LS_KEY, JSON.stringify(cached));
    }
}
