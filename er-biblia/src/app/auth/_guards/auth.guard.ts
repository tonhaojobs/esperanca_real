import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private authService: AuthenticationService, private toasterService: ToasterService) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if(!this.authService.isAuthenticated()) {

            console.log('No Authentication Present, redirecting to Login');

            this.toasterService.pop('error', `Usuário não autenticado`);
            this.router.navigate(['/login']);

            return false;
        }

        if(this.authService.canAccess(state.url)) {

            console.log(`Navigating to ${state.url}`);
            return true;
        }

        const perfil = this.authService.getIdentity().perfil;

        if(perfil == "USUARIO" && state.url != "/processamento") {

            this.router.navigate(['processamento']);
            this.toasterService.pop('Acesso Negado', `Seu perfil, ${perfil}, não possui acesso à tela: ${state.url}`);
        }

        this.authService.isExpired();

        return false;        
    }
}
