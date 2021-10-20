import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/food.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { CartItem } from 'src/app/models/cartitem';

@Component({
    selector: 'app-list-food',
    templateUrl: './list-food.component.html',
    styleUrls: ['./list-food.component.css']
})

export class ListFoodComponent implements OnInit {
    data: Food[] = []
    sortedData: Food[] = []
    searchString;
    sortby: string;

    constructor(
        private foodService: FoodService,
        private cartService: CartService,
    ) { }

    ngOnInit(): void {
        this.getListFood();
    }

    getListFood() {
        this.foodService.get().subscribe((res: any) => {
            this.data = res
            this.sortedData = res
        })
    }

    searchFood(e) {
        if (e === '') {
            this.sortedData = this.data;
            return;
        }
        this.sortedData = this.data.filter(({ title }) => title.toLowerCase().includes(e.toString().toLowerCase()));
    }

    changeSort(e){
        switch(e){
            case 'increase': this.sortedData.sort((a, b) => a.price - b.price); break;
            case 'decrease': this.sortedData.sort((a, b) => b.price - a.price); break;
            case 'highrate': this.sortedData.sort((a, b) => a.rate - b.rate); break;
            case 'lowrate': this.sortedData.sort((a, b) => b.rate - a.rate); break;
        }
    }

    addtoCart(index: number) {
        this.cartService.addtoCart(this.data[index]);
    }
}
