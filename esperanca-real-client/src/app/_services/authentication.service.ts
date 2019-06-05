import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { IdentityStorage } from '../_models/identity-storage';
import { Identity } from '../_models/identity';

import 'rxjs/add/operator/map';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private url: string = 'http://localhost/biblia-esperanca-real/esperanca-real-api/';
  identityStorage: IdentityStorage;
  private messageSource = new BehaviorSubject(false);
  public message = this.messageSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    public local: LocalStorageService,
    private idStorage: IdentityStorage
  ) {
    this.identityStorage = this.idStorage;
  }

  authenticate(login: string, password: string): Observable<AuthenticationResult> {

    var credentials = JSON.stringify({login: login, password: password});

    return this.http.post<AuthenticationResponse>(this.url + 'not-secure/login', credentials).map(resp => {

      if(resp.token) {
                        
        let id = resp.user.id;
        let token = resp.token;
        let userName = resp.user.nome;
        let login = resp.login;

        if (token) {
          let userAuthData = {
            token: token,
            userName: userName,
            id: id,
            login: login
          };
        
          this.identityStorage.saveAuthData(userAuthData);
          this.messageSource.next(true);
          return new AuthenticationResult(true, null);
        }
      } else {
        this.messageSource.next(false);
        return new AuthenticationResult(false, "Login ou Senha Inválidos");
      }
    });
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

  getPerfis(perfis: Array<UserPerfilResponse>){
    var perfilArray = ""; 
    perfis.forEach(element => {
        perfilArray += element.nome + ",";
    });
    return perfilArray;
  }

  isAdminSistema(): boolean {
    var retorno = false;
    this.getIdentity().perfil.split(",").forEach(element => {
        if(element == "ADMINISTRADOR"){
            retorno = true;
        }
    });
    return retorno;
  }

}
