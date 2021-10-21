import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-detail-food',
    templateUrl: './detail-food.component.html',
    styleUrls: ['./detail-food.component.css']
})
export class DetailFoodComponent implements OnInit {
    food: Food = null;
    constructor(
        private foodService: FoodService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private titleService: Title,
        private router: Router,
    ) { }

    ngOnInit() {
        window.scrollTo(0, 0)
        this.foodService.getbyId(this.route.snapshot.params['id']).subscribe((res: any) => {
            this.food = res;
            this.titleService.setTitle(this.food?.title + " - Detail Food - Best food for your meals, your health!")
        },
        (err: any)=> {
            if(err.status === 404){
                this.food = new Food();
                if (err.status === 404)
                    Swal.fire({
                        title: "Not Found!",
                        text: "Food does not exist!",
                        icon: "error",
                    })
                this.router.navigate(['/error'])
            }
        })
    }

    addtoCart() {
        this.cartService.addtoCart(this.food);
    }
}
