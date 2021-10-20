import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailFoodComponent } from './components/detail-food/detail-food.component';
import { EditFoodComponent } from './components/edit-food/edit-food.component';
import { ListFoodComponent } from './components/list-food/list-food.component';
import { ManageFoodComponent } from './components/manage-food/manage-food.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
    { path: '', component: ListFoodComponent },
    { path: 'detail/:id', component: DetailFoodComponent },
    { path: 'cart', component: CartComponent },
    {
        path: 'dashboard', component: DashboardComponent, children: [
            { path: '', redirectTo: 'addfood', pathMatch: 'full' },
            { path: 'addfood', component: AddFoodComponent },
            { path: 'managefood', component: ManageFoodComponent },
            { path: 'editfood', component: EditFoodComponent },
            { path: 'editfood/:id', component: EditFoodComponent },
        ]
    },
    { path: '**', component: NotFoundComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
