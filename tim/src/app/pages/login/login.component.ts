import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  campoObrigatorio: string = '';

  errorEmail: boolean = false;

  loginForm: FormGroup;
  
  constructor(private authenticationService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    this.authenticationService.clearAuthentication();

    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
    });
  }

  logon(): void {

    if(this.email && this.email.trim().length > 0) {

      this.authenticationService.authenticate(this.email, this.senha).subscribe(
        result => {
          this.router.navigate(["private"]);
        }, error => {
          this.router.navigate(["public"]);
        }
      );
    } else {
      this.errorEmail = true;
    }
  }

  redefinirSenha(): void {

  }

  cadastro(): void {

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
