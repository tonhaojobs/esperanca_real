import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

const USER_AUTH_TOKEN_KEY = 'SessionDataToken';
const USER_AUTH_ID_USER = 'SessionDataIdUser';
const USER_AUTH_EMAIL_USER = 'SessionDataEmail';
const USER_AUTH_NOME_USER = 'SessionDataNome';

@Injectable()
export class IdentityStorage {

    constructor() { }

    public saveAuthData(userData: any) {

        this.clearAuthData();

        window.sessionStorage.setItem(USER_AUTH_TOKEN_KEY, userData.token);
        window.sessionStorage.setItem(USER_AUTH_ID_USER, userData.id);
        window.sessionStorage.setItem(USER_AUTH_EMAIL_USER, userData.email);
        window.sessionStorage.setItem(USER_AUTH_NOME_USER, userData.nome);
    }

    public clearAuthData() {
        window.sessionStorage.removeItem(USER_AUTH_TOKEN_KEY);
        window.sessionStorage.removeItem(USER_AUTH_ID_USER);
        window.sessionStorage.removeItem(USER_AUTH_EMAIL_USER);
        window.sessionStorage.removeItem(USER_AUTH_NOME_USER);
        window.sessionStorage.clear();
    }

    public authenticationPresent(): boolean {
        return window.sessionStorage.getItem(USER_AUTH_TOKEN_KEY) !== null;
    }

    public getIdentity(): any {
        let identity: any = {
            token: sessionStorage.getItem(USER_AUTH_TOKEN_KEY),
            id: sessionStorage.getItem(USER_AUTH_ID_USER),
            email: sessionStorage.getItem(USER_AUTH_EMAIL_USER),
            nome: sessionStorage.getItem(USER_AUTH_NOME_USER)
        };

        return identity;
    }

    public getIdentityPromise(): Observable<any> {
        return this.getIdentity();
    }
}
