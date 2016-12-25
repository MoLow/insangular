import { Component, OnInit, Input } from '@angular/core';
import { InstagramImage } from './image';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    @Input() image: InstagramImage;

    constructor() { }

    ngOnInit() {
    }
}
