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

@NgModule({
    declarations: [
        AppComponent,
        ListFoodComponent,
        TopBarComponent,
        TestComponent,
        FooterComponent,
        CarouselComponent
    ],
    imports: [
        [SweetAlert2Module.forRoot()],
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', component: ListFoodComponent },
            { path: 'detail/:id', component: DetailFoodComponent },
        ]),
        NgbModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
