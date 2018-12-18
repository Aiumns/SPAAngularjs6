import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { throwError, pipe, Observable, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {
    public apiUrl: string = 'http://localhost:65447/api/Registration';
    constructor(private httpClient: HttpClient) {}

    RegisterUser (user: any)  {
          return this.httpClient.post(this.apiUrl, user).pipe(
          map(res => res),
          catchError(this.errorHandler)
         );
      }
    errorHandler(error: Response)  {
                console.log(error);
                return throwError(error);
      }
}

