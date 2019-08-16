import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly ID_FORMULARIO_LOGON: number = 1;
  readonly ID_FORMULARIO_SENHA: number = 2;
  readonly ID_FORMULARIO_CADASTRO: number = 3;

  focus;
  focus1;

  email: string;
  senha: string;
  senhaConfirmacao: string;
  nome: string;


  tituloLogin: string = 'Entrar';

  esqueciSenha: boolean = false;
  possuiCadastro: boolean = true;
  campoObrigatorio: string = '';

  errorEmail: boolean = false;
  
  constructor(private authenticationService: AuthenticationService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.authenticationService.clearAuthentication();
  }

  logon(): void {

    // https://www.npmjs.com/package/ngx-toastr

    if(this.validarFormulario(this.ID_FORMULARIO_LOGON)) {

      this.authenticationService.authenticate(this.email, this.senha).subscribe(
        result => {
          this.router.navigate(["private"]);
        }, error => {
          this.router.navigate(["public"]);
        }
      );
    } 
  }

  redefinirSenha(): void {

    if(this.validarFormulario(this.ID_FORMULARIO_SENHA)) {
      console.log('teste');
      
    }
  }

  cadastrar(): void {

    if(this.validarFormulario(this.ID_FORMULARIO_CADASTRO)) {
    }

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

  validarFormulario(idFormulario: number): boolean {

    let erro: number = 0;
    this.toastr.clear();
    
    switch(idFormulario) {

      case this.ID_FORMULARIO_LOGON : {
        
        if(!this.senha || this.senha.trim().length === 0){
          this.toastr.warning('Campo \'Senha\' Obrigatório', '');
          erro++;
        }

        if(!this.email || this.email.trim().length === 0){
          this.toastr.warning('Campo \'E-mail\' Obrigatório', '');
          erro++;
        }
        
        break;
      }

      case this.ID_FORMULARIO_SENHA : {

        if(!this.email || this.email.trim().length === 0){
          this.toastr.warning('Campo \'Senha\' Obrigatório', '');
          erro++;
        }

        break;
      }

      case this.ID_FORMULARIO_CADASTRO : {

        if(!this.senhaConfirmacao || this.senhaConfirmacao.trim().length === 0){
          this.toastr.warning('Campo \'Repetir Senha\' Obrigatório', '');
          erro++;
        }

        if(!this.senha || this.senha.trim().length === 0){
          this.toastr.warning('Campo \'Senha\' Obrigatório', '');
          erro++;
        }

        if(!this.email || this.email.trim().length === 0){
          this.toastr.warning('Campo \'E-mail\' Obrigatório', '');
          erro++;
        }

        if(!this.nome || this.nome.trim().length === 0){
          this.toastr.warning('Campo \'Nome\' Obrigatório', '');
          erro++;
        }

        if((this.senhaConfirmacao && this.senhaConfirmacao.trim().length > 0) && (this.senha && this.senha.trim().length > 0)){
          
          if(this.senhaConfirmacao !== this.senha) {
            this.toastr.warning('As senhas são diferentes', '');
            erro++;
          }
        }

        break;
      }
    }

    if(erro > 0) {
      return false;
    }

    return true;
  }

}
