import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MiddlewareService } from 'src/app/services/middleware.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
    numberofCartItem: number;
    constructor(
        private cartService: CartService,
        private middlewareService: MiddlewareService,
    ) {
        this.numberofCartItem = cartService.getNuberofCart();
    }

    ngOnInit(): void {
        this.middlewareService.getUpdateCart().subscribe(count => {
            this.numberofCartItem = count as number;
            console.log(count);
        })
    }
}
