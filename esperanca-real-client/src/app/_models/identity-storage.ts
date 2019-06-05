import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

const USER_AUTH_USERNAME_KEY = 'SessionDataUserName';
const USER_AUTH_PERFIL_KEY = 'SessionDataPerfil';
const USER_AUTH_TOKEN_KEY = 'SessionDataToken';
const USER_AUTH_ID_USER = 'SessionDataIdUser';
const USER_AUTH_LOGIN_KEY = 'SessionDataLogin';
const USER_AUTH_TIPO_USUARIO_KEY = 'SessionDataTipoUsuario';

@Injectable()
export class IdentityStorage {

    constructor() { }

    public saveAuthData(userData: any) {

        window.sessionStorage.removeItem(USER_AUTH_USERNAME_KEY);
        window.sessionStorage.removeItem(USER_AUTH_PERFIL_KEY);
        window.sessionStorage.removeItem(USER_AUTH_TOKEN_KEY);
        window.sessionStorage.removeItem(USER_AUTH_LOGIN_KEY);
        window.sessionStorage.removeItem(USER_AUTH_TIPO_USUARIO_KEY);
        window.sessionStorage.setItem(USER_AUTH_USERNAME_KEY, userData.userName);
        window.sessionStorage.setItem(USER_AUTH_PERFIL_KEY, userData.perfil);
        window.sessionStorage.setItem(USER_AUTH_TOKEN_KEY, userData.token);
        window.sessionStorage.setItem(USER_AUTH_ID_USER, userData.id);
        window.sessionStorage.setItem(USER_AUTH_LOGIN_KEY, userData.login);
        window.sessionStorage.setItem(USER_AUTH_TIPO_USUARIO_KEY, userData.tipoUsuario);
    }

    public clearAuthData() {
        window.sessionStorage.removeItem(USER_AUTH_USERNAME_KEY);
        window.sessionStorage.removeItem(USER_AUTH_PERFIL_KEY);
        window.sessionStorage.removeItem(USER_AUTH_TOKEN_KEY);
        window.sessionStorage.removeItem(USER_AUTH_ID_USER);
        window.sessionStorage.removeItem(USER_AUTH_LOGIN_KEY);
        window.sessionStorage.removeItem(USER_AUTH_TIPO_USUARIO_KEY);
        window.sessionStorage.clear();
    }

    public authenticationPresent(): boolean {
        return window.sessionStorage.getItem(USER_AUTH_TOKEN_KEY) !== null;
    }

    public getIdentity(): any {
        let identity: any = {
            userName: sessionStorage.getItem(USER_AUTH_USERNAME_KEY),
            perfil: sessionStorage.getItem(USER_AUTH_PERFIL_KEY),
            token: sessionStorage.getItem(USER_AUTH_TOKEN_KEY),
            id: sessionStorage.getItem(USER_AUTH_ID_USER),
            login: sessionStorage.getItem(USER_AUTH_LOGIN_KEY),
            tipoUsuario: sessionStorage.getItem(USER_AUTH_TIPO_USUARIO_KEY)
        };

        return identity;
    }

    public getIdentityPromise(): Observable<any> {
        return this.getIdentity();
    }
}
