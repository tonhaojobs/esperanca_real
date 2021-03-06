import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { IdentityStorage } from '../_models/identity-storage';
import { Identity } from '../_models/identity';

import 'rxjs/add/operator/map';
import { AuthenticationResult } from '../_models/authentication.result';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  //private url: string = 'http://localhost/biblia-esperanca-real/esperanca-real-api/';
  private url: string = 'api/';
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

    let formData: FormData = new FormData(); 
    formData.append('login', login); 
    formData.append('password', password); 

    return this.http.post<AuthenticationResponse>(this.url + 'login', formData).map(resp => {

      if(resp.token) {
                        
        let id = resp.user['0']['id'];
        let token = resp.token;
        let email = resp.user['0']['email'];
        let nome = resp.user['0']['nome'];

        if (token) {
          let userAuthData = {
            id: id,
            token: token,
            email: email,
            nome: nome
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

  cadastro(primeiroNome: string, ultimoNome: string, email: string, senha: string) : Observable<Response> {

    let formData: FormData = new FormData(); 
    formData.append('primeiroNome', primeiroNome); 
    formData.append('ultimoNome', ultimoNome); 
    formData.append('email', email); 
    formData.append('senha', senha); 

    return this.http.post<Response>(this.url + 'cadastro', formData);
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

  alterarSenha(usuario: number, senha: string, novaSenha: string) : Observable<Response> {
    let formData: FormData = new FormData(); 
    formData.append('usuario', usuario.toString()); 
    formData.append('senha', senha); 
    formData.append('novaSenha', novaSenha); 

    return this.http.post<Response>(this.url + 'usuarioSenha', formData);
  }

  protected getHeaders() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('responseType', 'text');
    headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  }

}
