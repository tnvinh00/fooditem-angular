import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/food.service';


@Component({
    selector: 'app-list-food',
    templateUrl: './list-food.component.html',
    styleUrls: ['./list-food.component.css']
})

export class ListFoodComponent implements OnInit {
    data: Food[] = []

    constructor(private foodService: FoodService) { }

    ngOnInit(): void {
        this.getListFood();
    }

    getListFood() {
        this.foodService.get().subscribe((res: any) => {
            this.data = res
        })
    }
}
