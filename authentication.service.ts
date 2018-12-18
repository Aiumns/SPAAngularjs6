import { HttpClient, HttpClientModule , HttpHeaders} from '@angular/common/http';
import { Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { throwError, pipe, Observable, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public apiURL:string= 'http://localhost:65447';

    constructor(private httpClient: HttpClient) {}

ValidateUser(user: any)	{
    var userData = 'username=' + user.UserName + '&password=' + user.Password + '&grant_type=password';
    var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-ww-form-urlencoded', 'No-Auth' : 'True'});
    return this.httpClient.post(this.apiURL + '/token', userData , {headers : reqHeader})
                    .pipe(	    map(res => res), 	catchError(this.errorHandler)
            );
    }

public isAuthenticated(): boolean {
	      return this.getToken() !== null;
	  }

	 storeToken(token: string) {
	      localStorage.setItem("token", token);
    }

   getToken() {
     return localStorage.getItem("token");
   }

   removeToken() {
    return localStorage.removeItem("token");
       }

    errorHandler(error: Response)
    {
              console.log(error);
              return throwError(error);
    }

    RegisterUser (user: any)
      {
          return this.httpClient.post(this.apiURL, user).pipe(
          map(res => res),
          catchError(this.errorHandler)
         );
      }
}

