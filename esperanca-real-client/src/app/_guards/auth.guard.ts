import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(!this.authService.isAuthenticated()) {
            this.router.navigate(['home']);
            return false;
        }

        return true;
    }
}
