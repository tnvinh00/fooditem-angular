import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Food } from './food';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
}
const apiUrl = 'https://foodsorderapi.azurewebsites.net';

@Injectable({
    providedIn: 'root'
})
export class FoodService {

    constructor(private httpClient: HttpClient) { }

    get(): Observable<Food[]> {
        return this.httpClient.get<Food[]>(`${apiUrl}/api/Foods`).pipe()
    }
    getbyId(id: number): Observable<Food> {
        console.log(`${apiUrl}/api/Foods/${id}`);
        return this.httpClient.get<Food>(`${apiUrl}/api/Foods/${id}`).pipe()
    }
}
