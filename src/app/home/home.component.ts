import { Component, OnInit } from '@angular/core';

import { InstagramService } from '../instagram.service';
import { InstagramImage } from '../image/image';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    images: InstagramImage[];
    tags: string[];
    error: string;

    constructor(private instagram: InstagramService) {
        this.instagram.getLastTags()
            .subscribe(tags => { this.tags = tags });
    }

    ngOnInit() {
    }

    getItems(tag: string) {
        this.instagram.searchTag(tag)
            .subscribe(images => this.images = images, error => this.error = error);
    }

}
