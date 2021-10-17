import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/food.service';

@Component({
    selector: 'app-detail-food',
    templateUrl: './detail-food.component.html',
    styleUrls: ['./detail-food.component.css']
})
export class DetailFoodComponent implements OnInit {
    food: Food = new Food();
    constructor(
        private foodService: FoodService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.foodService.getbyId(this.route.snapshot.params['id']).subscribe((res: any) => {
            this.food = res;
        })
        console.log(this.food);
    }

}
