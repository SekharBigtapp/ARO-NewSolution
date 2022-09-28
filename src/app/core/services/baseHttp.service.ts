import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export abstract class BaseHttp {

    constructor(private http: HttpClient) { }


    get<T>(url: string): Observable<T> {
        let  bearer: any = localStorage.getItem('token');
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'token': bearer,
            'Authorization': `Bearer ` + bearer,
        });
        return this.http.get<T>(environment.url + url, { headers: header }).pipe(
            map((response) => response),
            catchError(this.handleError)
        );
    }

    post<T>(url: string, body: any): Observable<T> {
        let  bearer: any = localStorage.getItem('token');
        
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            //'token': bearer
            'Authorization': `Bearer ` + bearer,
        });
        return this.http
            .post<T>(environment.url + url, JSON.stringify(body), { headers: header })
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    

    
    login<T>(url: string, body: any): Observable<T> {
        const header = new HttpHeaders({
        'Content-Type': 'application/json',
        });
        return this.http
        .post<T>(environment.url + url, JSON.stringify(body), { headers: header })
        .pipe(
            map((response) => response),
            catchError(this.handleError)
        );
    }

    logout<T>(url: string, body: any): Observable<T> {
        let  bearer: any = localStorage.getItem('token');
        
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
           // 'token': bearer
            //'Authorization': `Bearer ` + bearer,
        });
        return this.http
            .post<T>(environment.url + url, JSON.stringify(body), { headers: header })
            .pipe(
                map((response) => response),
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        console.log(error, 'handleError');
        if (error.error instanceof Error) {
            // Get client-side error
            console.log(error.error, 'client-side error');
            errorMessage = error.error.message;
            console.log(errorMessage)
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status} \n statusText: ${error.statusText} \n Message: ${error.message}`;
            console.log(errorMessage);
        }
        return throwError(() => error);
    }
}
