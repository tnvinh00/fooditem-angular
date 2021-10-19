import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FoodService } from 'src/app/food.service';
import { Food } from 'src/app/models/food';

@Component({
    selector: 'app-manage-food',
    templateUrl: './manage-food.component.html',
    styleUrls: ['./manage-food.component.css']
})
export class ManageFoodComponent implements OnInit {
    listFood: Food[];
    filter: string = 'all';
    loading: boolean = false;
    searchString: string;

    sortedData: Food[];
    // displayedColumns = ['id', 'imgSource', 'title', 'price', 'rate', 'deleted']
    // dataSource = new MatTableDataSource(this.listFood);
    // @ViewChild(MatSort, { static: true }) sort: MatSort;
    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private foodService: FoodService
    ) { }

    ngOnInit() {
        this.changeFilter('all');
    }

    changeFilter(e) {
        this.loading = true;
        this.listFood = null;
        switch (e) {
            case 'all': this.foodService.getAll().subscribe((res: any) => {
                this.listFood = res
                this.sortedData = this.listFood.slice();
                this.loading = false;
            }); break;
            case 'available': this.foodService.get().subscribe((res: any) => {
                this.listFood = res
                this.sortedData = this.listFood.slice();
                this.loading = false;
            }); break;
            case 'deleted': this.foodService.getDeleted().subscribe((res: any) => {
                this.listFood = res
                this.sortedData = this.listFood.slice();
                this.loading = false;
            }); break;
        }
        
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