import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Food } from 'src/app/models/food';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
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
        return this.httpClient.get<Food>(`${apiUrl}/api/Foods/${id}`).pipe()
    }
    addNewFood(food: Food){
        return this.httpClient.post<Food>(`${apiUrl}/api/Foods`, food, httpOptions).pipe(catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent)
                errorMsg = `Error: ${error.error.message}`;
            else
                errorMsg = this.getServerErrorMessage(error);
            return throwError(errorMsg);
        }))
    }

    deletebyId(id: number): Observable<Food> {
        return this.httpClient.delete<Food>(`${apiUrl}/api/Foods/${id}`).pipe(catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent)
                errorMsg = `Error: ${error.error.message}`;
            else
                errorMsg = this.getServerErrorMessage(error);
            return throwError(errorMsg);
        }))
    }

    updateFood(food: Food): Observable<Food>{
        console.log(`${apiUrl}/api/Foods/${food.id}`)
        return this.httpClient.put<Food>(`${apiUrl}/api/Foods/${food.id}`, food, httpOptions).pipe(catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent)
                errorMsg = `Error: ${error.error.message}`;
            else
                errorMsg = this.getServerErrorMessage(error);
            return throwError(errorMsg);
        }))
    }


    // Other Methods
    getAll(): Observable<Food[]> {
        return this.httpClient.get<Food[]>(`${apiUrl}/api/FoodPlus/getAll`).pipe()
    }
    getDeleted(): Observable<Food[]> {
        return this.httpClient.get<Food[]>(`${apiUrl}/api/FoodPlus/getDeleted`).pipe()
    }
    restore(id: number) {
        return this.httpClient.post<Food>(`${apiUrl}/api/FoodPlus/restore/${id}`, null).pipe()
    }
    deleteForever(id: number) {
        return this.httpClient.delete<Food>(`${apiUrl}/api/FoodPlus/deleteForever/${id}`).pipe()
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: return `Not Found: ${error.message}`;
            case 403: return `Access Denied: ${error.message}`;
            case 500: return `Internal Server Error: ${error.message}`;
            default: return `Unknown Server Error: ${error.message}`;
        }
    }
}
