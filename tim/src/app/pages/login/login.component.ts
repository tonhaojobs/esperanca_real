import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  focus;
  focus1;

  email: string;
  senha: string;

  tituloLogin: string = 'Entrar';

  esqueciSenha: boolean = false;
  possuiCadastro: boolean = true;
  
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.clearAuthentication();
  }

  logon(): void {

    
      console.log('OK');
      
    
  }

  toggleEsqueciSenha(): void {
    this.esqueciSenha = !this.esqueciSenha;
    this.tituloLogin = 'Redefinir Senha';
  }

  togglePossuiCadastro(): void {
    this.possuiCadastro = !this.possuiCadastro;
    this.tituloLogin = 'Cadastro';
  }

  voltar(origem: any) : void {

    this.tituloLogin = 'Entrar';

    if(origem === 'redefinirSenha') {
      this.esqueciSenha = false;
    } else {
      this.possuiCadastro = true;
    }
  }

}
