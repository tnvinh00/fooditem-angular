import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartitem';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    list: CartItem[] = [];
    total: number = 0;

    // item: CartItem = {
    //     id: 1,
    //     imgSource: "https://d1sag4ddilekf6.azureedge.net/cuisine/62/icons/FastFood_4710e425c3d24db2aa4280aa207a22d3_1547819143037208832.jpg",
    //     quantity: 1,
    //     price: 5.00,
    //     subtotal: 5.00
    // };
    constructor(
        private cartService: CartService,
        private titleService: Title
    ) { }

    ngOnInit() {
        // this.list.push(this.item);
        // this.cartService.setListcart(this.list);
        this.list = this.cartService.getListCart();
        this.total = this.cartService.getTotal();
        this.titleService.setTitle("Cart (" + this.list.length + ") - Best food for your meals, your health!");
    }

    addtoCart(id: number){
        this.cartService.setListcart(this.list);
    }

    delete(index: number){
        Swal.fire({
            title: "Are you sure?",
            text: "Food will be delete. Cart will be update",
            icon: "warning",
            showCancelButton: true,
        })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    this.list = this.cartService.deleteItemCart(index);
                    console.log(this.list)
                }
            });
    }

    deleteCartItem(index: number){
        this.list.splice(index, 1);
        this.cartService.setListcart(this.list);
    }
}
