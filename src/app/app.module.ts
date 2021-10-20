import { TestComponent } from './components/test/test.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListFoodComponent } from './components/list-food/list-food.component';
import { MaterialModule } from './material.module';
import { DetailFoodComponent } from './components/detail-food/detail-food.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Min-MaxValidators
import { MaxValidatorDirective, MinValidatorDirective } from './custom-validator/min-max-directive.directive';
import { MinMaxValidators } from './custom-validator/min-max-validator';
import { ManageFoodComponent } from './components/manage-food/manage-food.component';
import { EditFoodComponent } from './components/edit-food/edit-food.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

@NgModule({
    declarations: [
        AppComponent,
        MinValidatorDirective,
        MaxValidatorDirective,
        ListFoodComponent,
        TopBarComponent,
        TestComponent,
        FooterComponent,
        CarouselComponent,
        DetailFoodComponent,
        CartComponent,
        DashboardComponent,
        AddFoodComponent,
        ManageFoodComponent,
        EditFoodComponent,
        NotFoundComponent,
        ScrollToTopComponent
    ],
    imports: [
        [SweetAlert2Module.forRoot()],
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule,
        ToastrModule.forRoot({
            autoDismiss: true,
            maxOpened: 2,
            timeOut: 2000,
        })
    ],
    providers: [MinMaxValidators],
    bootstrap: [AppComponent]
})
export class AppModule { }
