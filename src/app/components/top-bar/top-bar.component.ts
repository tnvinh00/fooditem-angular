import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
    numberofCartItem: number;
    constructor(
        private cartService: CartService,
    ) {
        this.numberofCartItem = cartService.getNuberofCart();
    }

    ngOnInit(): void {
        // this.numberofCartItem = this.cartService.getNuberofCart();
    }

}
