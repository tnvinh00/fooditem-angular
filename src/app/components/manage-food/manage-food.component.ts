import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/models/food';
import Swal from 'sweetalert2';


enum Estatus{
    true = "Enable",
    false = "Disabled"   
}
@Component({
    selector: 'app-manage-food',
    templateUrl: './manage-food.component.html',
    styleUrls: ['./manage-food.component.css']
})

export class ManageFoodComponent implements OnInit {
    foodModal: Food = new Food();
    listFood: Food[];
    filter: string = 'all';
    loading: boolean = false;
    searchString: string = '';

    clean: boolean = false;

    sortedData: Food[];
    // displayedColumns = ['id', 'imgSource', 'title', 'price', 'rate', 'deleted']
    // dataSource = new MatTableDataSource(this.listFood);
    // @ViewChild(MatSort, { static: true }) sort: MatSort;
    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private foodService: FoodService,
        private titleService: Title,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.changeFilter('all');
        this.titleService.setTitle("Manage Food" + " - Best food for your meals, your health!")
    }

    changeFilter(e) {
        this.loading = true;
        this.listFood = null;
        switch (e) {
            case 'all': this.foodService.getAll().subscribe((res: any) => {
                this.listFood = res
                this.sortedData = this.listFood.slice();
                this.loading = false;
                this.sortedData.map((food) => {
                    food.status = food.deleted ? Estatus.true : Estatus.false;
                })
            }); break;
            case 'available': this.foodService.get().subscribe((res: any) => {
                this.listFood = res
                this.sortedData = this.listFood.slice();
                this.loading = false;
                this.sortedData.map((food) => {
                    food.status = food.deleted ? Estatus.true : Estatus.false;
                })
            }); break;
            case 'deleted': this.foodService.getDeleted().subscribe((res: any) => {
                this.listFood = res
                this.sortedData = this.listFood.slice();
                this.loading = false;
                this.sortedData.map((food) => {
                    food.status = food.deleted ? Estatus.true : Estatus.false;
                })
            }); break;
        }
        
    }

    openModal(content, index: number){
        this.foodModal = this.sortedData[index];
        this.modalService.open(content);
    }

    delete_Click(id: number) {
        Swal.fire({
            title: "Are you sure?",
            text: "Food will be delete, you can be restore later!",
            icon: "warning",
            showCancelButton: true,
        })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    this.foodService.deletebyId(id).subscribe(
                        (res: any) => {
                            Swal.fire({
                                title: "Good job!",
                                text: "Deleted success!",
                                icon: "success",
                            })
                            this.changeFilter(this.filter);
                        },
                        (err: any) => {
                            Swal.fire({
                                title: "Failed!",
                                text: err,
                                icon: "error",
                            })
                            console.log(err);
                        }
                    );
                }
            });
    }

    restore_Click(id: number) {
        Swal.fire({
            title: "Are you sure?",
            text: "Food will be restore!",
            icon: "warning",
            showCancelButton: true,
        })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    this.foodService.restore(id).subscribe(
                        (res: any) => {
                            Swal.fire({
                                title: "Good job!",
                                text: "Restored success!",
                                icon: "success",
                            })
                            this.changeFilter(this.filter);
                        },
                        (err: any) => {
                            Swal.fire({
                                title: "Failed!",
                                text: err,
                                icon: "error",
                            })
                            console.log(err);
                        }
                    );
                }
            });
    }

    deleteForever_Click(id: number){
        Swal.fire({
            title: "Are you sure?",
            text: "Food will be delete forever? You can't restore it later.",
            icon: "warning",
            showCancelButton: true,
        })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    this.foodService.deleteForever(id).subscribe(
                        (res: any) => {
                            // console.log(res);
                            Swal.fire({
                                title: "Good job!",
                                text: "Food was be deleted forever!",
                                icon: "success",
                            })
                            this.changeFilter(this.filter);
                        },
                        (err: any) => {
                            Swal.fire({
                                title: "Failed!",
                                text: err,
                                icon: "error",
                            })
                            console.log(err);
                        }
                    );
                }
            });
    }

    searchFood(e) {
        if (e === '') {
            this.sortedData = this.listFood;
            return;
        }
        this.sortedData = this.listFood.filter(({ title }) => title.toLowerCase().includes(e.toString().toLowerCase()));
    }

    sortData(sort: MatSort) {
        const data = this.listFood.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }
        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id': return compare(a.id, b.id, isAsc);
                case 'title': return compare(a.title, b.title, isAsc);
                case 'price': return compare(a.price, b.price, isAsc);
                case 'rate': return compare(a.rate, b.rate, isAsc);
                case 'deleted': return compare(a.deleted.toString(), b.deleted.toString(), isAsc);
                default: return 0;
            }
        });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}