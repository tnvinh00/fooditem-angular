import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodService } from 'src/app/food.service';
import { Food } from 'src/app/models/food';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-food',
    templateUrl: './add-food.component.html',
    styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
    food: Food = new Food();
    onSubmit: boolean = false;

    @ViewChild('FormAddFood') formAddFood: NgForm;

    constructor(
        private foodService: FoodService
    ) { }

    ngOnInit() {
    }

    addNewFood_Click() {
        // console.log(this.food);
        this.onSubmit = true;

        if (!this.formAddFood.invalid) {
            this.foodService.addNewFood(this.food).subscribe(
                (res: any) => {
                    Swal.fire({
                        title: "Good job!",
                        text: "New food added!",
                        icon: "success",
                    })
                    this.food = new Food();
                    this.onSubmit = false;
                },
                (err: any) => {
                    Swal.fire({
                        title: "Failed!",
                        text: err,
                        icon: "error",
                    })
                    console.log(this.onSubmit);
                    console.log(err);
                    this.onSubmit = false;
                }
            )
        }
        else {
            Swal.fire({
                title: "Warning!",
                text: "You must type all required fields!",
                icon: "warning",
            })
            this.onSubmit = false;
        }
    }
}
