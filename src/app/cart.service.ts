import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CartItem } from './models/cartitem';

@Injectable({
    providedIn: 'root',
})

export class CartService {
    // listcart: CartItem[] = [];
    constructor(
        private toastr: ToastrService
    ) { }

    OnInit() {
    }

    setListcart(cartItem: CartItem[]) {
        let listcart;
        listcart = cartItem;
        localStorage.setItem("fooditem", JSON.stringify(listcart));
    }

    addtoCart(food) {
        let listcart;
        listcart = JSON.parse(localStorage.getItem('fooditem'));
        // Update item exist
        if(listcart.find(item => item.id === food.id)) {
            // Get index of item exist
            let index = listcart.findIndex(item => item.id === food.id)
            let temp = {
                id: food.id,
                imgSource: food.imgSource,
                quantity: listcart[index].quantity + 1,
                price: food.price,
                subtotal: (listcart[index].quantity + 1)*food.price,
            };
            listcart.splice(index, 1);
            listcart.unshift(temp);
            localStorage.setItem("fooditem", JSON.stringify(listcart));
            this.toastr.success('Updated your cart!', 'Updated');
        }
        // Add new item to cart
        else{
            let temp = {
                id: food.id,
                imgSource: food.imgSource,
                quantity: 1,
                price: food.price,
                subtotal: food.price,
            };
            listcart.unshift(temp);
            localStorage.setItem("fooditem", JSON.stringify(listcart));
            this.toastr.success('Add to cart!', 'Added');
        }
        return listcart;
    }

    deleteItemCart(index: number){
        let listcart: CartItem[];
        listcart = JSON.parse(localStorage.getItem('fooditem'));
        listcart.splice(index, 1)
        localStorage.setItem("fooditem", JSON.stringify(listcart));
        return listcart;
    }

    getTotal() {
        let listcart;
        listcart = JSON.parse(localStorage.getItem('fooditem'));
        return listcart.reduce((prev, curr) => prev + curr["price"] * curr["quantity"], 0);
    }

    getNuberofCart() {
        let listcart;
        listcart = JSON.parse(localStorage.getItem('fooditem'));
        return listcart ? listcart.length : 0;
    }

    getListCart() {
        let listcart;
        listcart = JSON.parse(localStorage.getItem('fooditem'));
        return listcart;
    }
}