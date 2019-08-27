import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  primeiroNome: string;
  ultimoNome: string;


  tituloLogin: string = 'Entrar';

  esqueciSenha: boolean = false;
  possuiCadastro: boolean = true;
  campoObrigatorio: string = '';

  errorEmail: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(private authenticationService: AuthenticationService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.authenticationService.clearAuthentication();
  }

  logon(): void {
    
    this.blockUI.start();

    if(this.validarFormulario(this.ID_FORMULARIO_LOGON)) {

      this.authenticationService.authenticate(this.email, this.senha).subscribe(
        result => {
          this.router.navigate(["private"]);
          this.blockUI.stop();
        }, error => {
          if(error['status'] === 403) {
            this.toastr.error('E-mail e/ou Senha Inválido(s)');
          }
          
          this.router.navigate(["public"]);
          this.blockUI.stop();
        }
      );
    } 
  }

  redefinirSenha(): void {

    if(this.validarFormulario(this.ID_FORMULARIO_SENHA)) {
      this.authenticationService.authenticate(this.email, this.senha).subscribe(
        
      );
    }
  }

  cadastrar(): void {

    if(this.validarFormulario(this.ID_FORMULARIO_CADASTRO)) {

      this.authenticationService.cadastro(this.primeiroNome, this.ultimoNome, this.email, this.senha).subscribe( data => {
      
        if(data) {
          this.toastr.success('Usuário cadastrado com sucesso');
        } else {
          this.toastr.error('Usuário já cadastrado. Utilize outra conta de e-mail');
        }
      });
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

    let validaPreenchimento: boolean = true;
    this.toastr.clear();
    
    switch(idFormulario) {

      case this.ID_FORMULARIO_LOGON : {
        
        if(!this.senha || this.senha.trim().length === 0){
          this.toastr.warning('Campo \'Senha\' Obrigatório', '');
          validaPreenchimento = false;
        }

        if(!this.email || this.email.trim().length === 0){
          this.toastr.warning('Campo \'E-mail\' Obrigatório', '');
          validaPreenchimento = false;
        }
        
        break;
      }

      case this.ID_FORMULARIO_SENHA : {

        if(!this.email || this.email.trim().length === 0){
          this.toastr.warning('Campo \'Senha\' Obrigatório', '');
          validaPreenchimento = false;
        }

        break;
      }

      case this.ID_FORMULARIO_CADASTRO : {

        if(!this.senhaConfirmacao || this.senhaConfirmacao.trim().length === 0){
          this.toastr.warning('Campo \'Repetir Senha\' Obrigatório', '');
          validaPreenchimento = false;
        }

        if(!this.senha || this.senha.trim().length === 0){
          this.toastr.warning('Campo \'Senha\' Obrigatório', '');
          validaPreenchimento = false;
        }

        if(!this.email || this.email.trim().length === 0){
          this.toastr.warning('Campo \'E-mail\' Obrigatório', '');
          validaPreenchimento = false;
        }

        if(!this.ultimoNome || this.ultimoNome.trim().length === 0){
          this.toastr.warning('Campo \'Último Nome\' Obrigatório', '');
          validaPreenchimento = false;
        }

        if(!this.primeiroNome || this.primeiroNome.trim().length === 0){
          this.toastr.warning('Campo \'Primeiro Nome\' Obrigatório', '');
          validaPreenchimento = false;
        }

        if((this.senhaConfirmacao && this.senhaConfirmacao.trim().length > 0) && (this.senha && this.senha.trim().length > 0)){
          
          if(this.senhaConfirmacao !== this.senha) {
            this.toastr.warning('As senhas são diferentes', '');
            validaPreenchimento = false;
          }
        }
        break;
      }
    }
    return validaPreenchimento;
  }

}
