import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/models/food';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-food',
    templateUrl: './edit-food.component.html',
    styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {
    food: Food;
    listFood: Food[];
    chooseFood: number;
    isChooseFood: boolean = false;
    loading: boolean = false;
    onSubmit: boolean = false;

    @ViewChild('FormEditFood') formEditFood: NgForm;

    constructor(
        private foodService: FoodService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) { }

    ngOnInit() {
        window.scrollTo(0, 200);
        this.titleService.setTitle("Edit " + " - Best food for your meals, your health!")
        this.foodService.get().subscribe((res: any) => {
            this.listFood = res
        })
        
        let idParam = this.route.snapshot.params['id']
        if (idParam)
            this.chooseFood = idParam;
        if (!this.chooseFood) {
            this.isChooseFood = false;
            this.loading = false;
        } else
            this.getFood(this.chooseFood);
    }

    getFood(id: number) {
        this.loading = true;
        this.foodService.getbyId(this.chooseFood).subscribe(
            (res: any) => {
                this.food = res
                this.loading = false;
                this.isChooseFood = true;
                this.titleService.setTitle("Edit " + this.food.title + " - Best food for your meals, your health!")
            },
            (err: any) => {
                this.loading = false;
                if (err.status === 404)
                    Swal.fire({
                        title: "No Found!",
                        text: "Food does not exist!",
                        icon: "error",
                    })
                this.router.navigate(['/dashboard/editfood'])
            })
    }

    changeChooseFood(e) {
        this.chooseFood = e;
        this.getFood(e);
    }
    updateFood_Click() {
        this.onSubmit = true;

        if (!this.formEditFood.invalid) {
            console.log(this.food)
            this.foodService.updateFood(this.food).subscribe(
                (res: any) => {
                    console.log(res)
                    Swal.fire({
                        title: "Good job!",
                        text: "Updated success!",
                        icon: "success",
                    })
                    this.onSubmit = false;
                },
                (err: any) => {
                    Swal.fire({
                        title: "Failed!",
                        text: err,
                        icon: "error",
                    })
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
