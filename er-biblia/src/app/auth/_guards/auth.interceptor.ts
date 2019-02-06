import { Injectable } from '@angular/core';

import {HttpInterceptor, HttpRequest, 
    HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { map } from 'rxjs/internal/operators/map';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    
    constructor(private authService: AuthenticationService, private router: Router, private toasterService: ToasterService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let authReq = req;

        if(req.url.search("/login") === -1) {

            if(this.authService.isAuthenticated()) {
               
                req = req.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${this.authService.getIdentity().token}`
                    }
                });

               //this.router.navigate(['pesquisaCentralMandados']);
                
            }
        } else {

            //alert('Usuário não autenticado!');

            //if(!this.authService.isAuthenticated()) {

            //    this.router.navigate(['login']);
           // }
        }

        return next.handle(req);
     
        
    }
}
