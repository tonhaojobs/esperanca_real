import { Component, OnInit } from '@angular/core';
import { IdentityStorage } from 'app/_models/identity-storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/_services/authentication.service';
import { LivroService } from 'app/services/livro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  nomeUsuario: string;
  private senha: string;
  private novaSenha: string;
  private novaSenhaConfirmacao: string;
  private leituraList: Array<any>;
  private collectionSize: number;
  private page: number = 1;
  private pageSize: number = 5;
  private exibirGridHistorico: boolean;

  private statusPorcentagem;
  private statusCapitulo;
  private statusColor: string;
  private status: Array<any> = [
    { start: 0, cor: '#922e3f' },
    { start: 25, cor: '#922e3f' },
    { start: 50, cor: '#922e3f' },
    { start: 75, cor: '#922e3f' }
  ];

  constructor(private idStorage: IdentityStorage, public router: Router, private toastr: ToastrService, private authSevice: AuthenticationService, private livroService: LivroService) { }

  ngOnInit() {
    this.nomeUsuario = this.idStorage.getIdentity()['nome'];
    this.carregaHistoricoLeitura();
    this.carregaHistoricoGeral();
  }

  logout() {
    this.idStorage.clearAuthData();
    localStorage.removeItem('currentUser');
    this.router.navigate(["public"]);
  }

  carregaHistoricoLeitura() {
    let usuario = this.idStorage.getIdentityPromise()['id'];

    if(usuario) {
      this.leituraList = new Array<any>();
      this.livroService.historicoByData(usuario).subscribe(retorno => {
        this.leituraList.push(...retorno);
        //this.collectionSize = 0;
        this.collectionSize = this.leituraList.length;
        this.exibirGridHistorico = (this.collectionSize > 0) ? true : false; 
      });
    }
  }

  // Carrega o percentual total de leitura do usuário
  carregaHistoricoGeral() {

    let usuario = this.idStorage.getIdentityPromise()['id'];

    if(usuario) {
      this.livroService.historicoGeral(usuario).subscribe(result => {
        this.statusPorcentagem = result[0]['porcentagem'];
        this.statusCapitulo = result[0]['capitulos_lidos'];
      });
    }
  }

  alterarSenha(): void {

    if(this.validarFormulario()) {
      let usuario = this.idStorage.getIdentityPromise()['id'];

      this.authSevice.alterarSenha(usuario, this.senha, this.novaSenha).subscribe(result =>{
        if(result != null) {
          if(result) {
            this.toastr.success('Senha alterada com sucesso', '');
          } else {
            this.toastr.warning('A nova senha deve ser diferente da senha atual', '');
          }
        } else {
          this.toastr.warning('A senha atual informada está incorreta', '');
        }
      });
    }
  }

  validarFormulario(): boolean {

    let validaPreenchimento: boolean = true;
    this.toastr.clear();
    
    if(!this.novaSenhaConfirmacao || this.novaSenhaConfirmacao.trim().length === 0){
      this.toastr.warning('Campo \'Repetir Nova Senha\' Obrigatório', '');
      validaPreenchimento = false;
    }
    
    if(!this.novaSenha || this.novaSenha.trim().length === 0){
      this.toastr.warning('Campo \'Nova Senha\' Obrigatório', '');
      validaPreenchimento = false;
    }
  
    if(!this.senha || this.senha.trim().length === 0){
      this.toastr.warning('Campo \'Senha Atual\' Obrigatório', '');
      validaPreenchimento = false;
    } 
    
    if((this.senha && this.senha.trim().length > 0) && (this.novaSenha && this.novaSenha.trim().length > 0) && (this.novaSenhaConfirmacao && this.novaSenhaConfirmacao.trim().length > 0)) {
      if(this.novaSenha !== this.novaSenhaConfirmacao) {
        this.toastr.warning('As senhas são diferentes', '');
        validaPreenchimento = false;
      }
    }

    return validaPreenchimento;
  }
}
