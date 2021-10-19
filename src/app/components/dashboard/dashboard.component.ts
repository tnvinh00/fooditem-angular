import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    activeLink = "addfood";
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        // link may be /dashboard/editfood/1 => return editfood
        this.activeLink = this.router.url.split('/').slice(2,3)[0];
    }
}
