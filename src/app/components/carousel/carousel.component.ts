import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
    images: string[] = ["https://i.imgur.com/5XI9TTB.jpg", "https://i.imgur.com/sWPP3zi.jpg", "https://i.imgur.com/i7TqXvw.jpg"];
    constructor() { }

    ngOnInit() {
    }

}
