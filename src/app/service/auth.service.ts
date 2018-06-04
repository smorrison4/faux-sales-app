import { Injectable } from '@angular/core';
import { User} from "../model/user.model";
// new way
import { Observable, of } from 'rxjs';
//import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
// end new way
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }
  user : User = null;
  //isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>('/api/authenticate', {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.user = user;
        }
        else {
          delay(1000)
        }
        return user;
      }));
  }

  isLoggedIn() : boolean {
    if( this.user !== null) { 
      return true;
    }
    return false;
  }


  logout(): void {
    localStorage.setItem('currentUser',null);
    this.user = null;
  }
}

