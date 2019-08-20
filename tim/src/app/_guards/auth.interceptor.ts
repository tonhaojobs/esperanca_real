import { Injectable } from '@angular/core';

import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.url.search("/login") === -1) {

            if(this.authService.isAuthenticated()) {
                req = req.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${this.authService.getIdentity().token}`
                    }
                });                
            }
        } else {

            if(this.authService.isAuthenticated()) {

                this.router.navigate(['public']);
            }
        }

        const started = Date.now();

        return next.handle(req).pipe(
            tap(
              event => {
                if (event instanceof HttpResponse) {
                  const elapsed = Date.now() - started;
                  console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
              }, err => {
                if (err.status === 401) {
                  this.router.navigate(["public"]);
                  this.toastr.error("Sessao expirada, faça login novamente!");
                }
              }
            )
        );
    }
}
