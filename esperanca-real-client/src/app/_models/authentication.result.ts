class AuthenticationResult {

    ok: boolean;
    message: string;
  
    constructor(ok: boolean, message: string){
        this.ok = ok;
        this.message = message;
    }
  }