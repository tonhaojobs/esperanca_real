import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private messageSource = new BehaviorSubject(false);
  public message = this.messageSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    public local: LocalStorageService,
  ) { }

  authenticate(login: string, password: string): Observable<AuthenticationResult> {

    var credentials = JSON.stringify({login: login, password: password});

        return this.http.post<AuthenticationResponse>('this.baseUrl' + 'api/login', credentials)
        .map(resp => {

          if(resp.token) {
            
          } else {

          }
        });
  }

}
