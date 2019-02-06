import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IdentityStorage } from '../_models/identity.storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { Identity } from '../_models/identity';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { PerfilDTO } from 'src/model/perfil/perfilDTO';
import 'rxjs/add/operator/catch';


class AuthorityResponse {

    public authority: string;
}

class UserPerfilResponse {

    public nome: string;
    public descricao: string;
    public email: string;
    public comarca: string;
    public lotacao: string;
    public cargo: string;
    public cpf: string;
}

class UserDataResponse {

    public id: string;
    public nome: string;
    public perfis: UserPerfilResponse[];
}

class AuthenticationResponse {

    public login: string;
    public token: string;
    public user: UserDataResponse;
    public authorities: AuthorityResponse[];
}

class AuthenticationResult {

    ok: boolean;
    message: string;

    constructor(ok: boolean, message: string) {
        this.ok = ok;
        this.message = message;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    identityStorage: IdentityStorage;
    baseUrl = environment.url;
    error = '';
    private messageSource = new BehaviorSubject(false);

    public message = this.messageSource.asObservable();

    private toasterService: ToasterService;

    constructor(
        private http: HttpClient,
        private idStorage: IdentityStorage,
        toasterService: ToasterService,
        private usuarioService: UsuarioService,
        private router: Router) {
        this.identityStorage = this.idStorage;
        this.toasterService = toasterService;

    }

    authenticate(login: string, password: string): Observable<AuthenticationResult> {

        var credentials = JSON.stringify({ login: login, password: password });

        return this.http.post<AuthenticationResponse>(this.baseUrl + 'api/login', credentials)

            .map(resp => {

                if (resp.token) {
                    if (resp.authorities.length < 1) {
                        this.messageSource.next(false);
                        return new AuthenticationResult(false, "Nenhum perfil associado a este usuário");
                    } else {

                        let token = resp.token;
                        let id = resp.user.id;
                        let userName = resp.user.nome;
                        let login = resp.login;
                        let perfil = null;

                        if (resp.user.perfis != null) {
                            let perfil = this.getPerfis(resp.user.perfis);
                        } else {
                            if (environment.production) {
                                this.toasterService.pop('error', "Usuário não tem perfil associado.")
                                return;
                            } else {
                                let perfil = 'ADMINISTRADOR';
                            }
                        }

                        if (token) {
                            let userAuthData =
                            {
                                token: token,
                                userName: userName,
                                id: id,
                                perfil: perfil
                            };

                            console.log(`Usuário autenticou: Nome: ${userName}`);

                            this.identityStorage.saveAuthData(userAuthData);

                            this.messageSource.next(true);

                            /* this.usuarioService.salvar(id, login, userName).subscribe(data=>{
                                 console.log("Verificado");
                             });*/

                            return new AuthenticationResult(true, null);
                        }
                    }
                }
                else {

                    this.messageSource.next(false);
                    this.toasterService.pop('error', "Login ou Senha Inválidos")
                    return new AuthenticationResult(false, "Login ou Senha Inválidos");
                }

            }).do(
                data => console.log(data),
                err => {
                    console.log(err)

                    if(err.status == 500){
                        this.toasterService.pop('error', "Usuario não encontrado no tjbaSeg")
                    }else if(err.status == 401){
                        this.toasterService.pop('error', "Falha na autenticação LDAP, verifique seu login e senha.")
                    }
                   
                },
                () => console.log('yay')
              );;


    }

    canAccess(view: string): boolean {

        // const perfil = this.identityStorage.getIdentity().perfil;

        // switch(view) {

        //     case "/home-ouvidoria": 

        //         if(perfil == "ADMIN") {
        return true;
        //         }

        //         return false;

        //     case "/processamento":

        //         if(perfil == "ADMIN" || perfil == "USUARIO") {
        //             return true;
        //         }

        //         return false;
        // }
    }

    getIdentity(): Identity {

        return this.identityStorage.getIdentity();
    }

    isAuthenticated(): boolean {

        return this.identityStorage.authenticationPresent();
    }

    clearAuthentication(): void {

        this.identityStorage.clearAuthData();

    }

    isAdminOuvidoria(): boolean {
        var retorno = false;
        this.getIdentity().perfil.split(",").forEach(element => {
            if (element == "ADM_OUVIDORIA") {
                retorno = true;
            }
        });
        return retorno;
    }

    isOuvidoria(): boolean {
        var retorno = false;
        this.getIdentity().perfil.split(",").forEach(element => {
            if (element == "OUVIDORIA") {
                retorno = true;
            }
        });
        return retorno;
    }

    isUnidade(): boolean {
        var retorno = false;
        this.getIdentity().perfil.split(",").forEach(element => {
            if (element == "UNIDADE") {
                retorno = true;
            }
        });
        return retorno;
    }

    getPerfis(perfis: Array<UserPerfilResponse>) {
        var perfilArray = "";
        perfis.forEach(element => {
            perfilArray += element.nome + ",";
        });
        return perfilArray;
    }

    isExpired() {
        this.usuarioService.sessao().subscribe(_ => { }, _ => {
            this.toasterService.pop('error', 'A sessão expirou, por favor realizar o login.');
            this.router.navigate(['login']);
        });
    }
}
