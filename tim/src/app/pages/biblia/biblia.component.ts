import { Component, OnInit } from '@angular/core';
import { Livro } from 'app/model/livro';
import { LivroService } from 'app/services/livro.service';
import { Pesquisa } from 'app/model/pesquisa';
import { Verso } from 'app/model/verso';
import { Versao } from 'app/model/versao';
import { IdentityStorage } from 'app/_models/identity-storage';
import { ToastrService } from 'ngx-toastr';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.scss']
})
export class BibliaComponent implements OnInit {

  fontSize = 16;
  focus: any;
  podeAbrirLivro: boolean = false;

  ID_VELHO_TESTAMENTO = 1;
  ID_NOVO_TESTAMENTO = 2;

  private velhoTestamento: Array<Livro>;
  private novoTestamento: Array<Livro>;

  selecaoVelhoTestamento: Livro = new Livro();
  selecaoNovoTestamento: Livro = new Livro();
  selecaoVersao: Versao = new Versao();

  resultadoPesquisa: Array<Pesquisa>;
  palavraChave: string;
  exibirResultado: boolean;
  countResultadoBusca: number;

  private livroPesquisa: number;
  private capituloPesquisa: number;
  private versiculoPesquisa: number;

  private livroDTO: Livro;
  private livro: number;
  private capitulo: number;
  private versao: number;
  private versos: Array<Verso>;
  private totalItems: number;
  private livros: Array<Livro[]>;
  private versoes: Array<any>;
  private backgroundClass: string; 
  private usuarioLogado: boolean;
  private capituloLido: boolean;
  private labelBotaoCapituloLido: string = 'Marcar capítulo como lido';
  private porcentagem: number;
  private numeroCapitulosLidos: number;
  private tipoProgressBar: string;
  private page: number = 1;
  teste: boolean = true;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private livroService: LivroService, private idStorage: IdentityStorage, private toastr: ToastrService, public dashboard: DashboardComponent) { }

  ngOnInit() {
    this.iniciarVariaveis();
    this.getLivros(1);
    this.getLivros(2);
    this.getVersoes();
    this.usuarioLogado = this.idStorage.authenticationPresent();

    this.abrirLivro(1, 1, 1);

    if(this.livro !== 0) {
      this.podeAbrirLivro = true;
    }
  }

  getLivros(testamento: number) {

    if(testamento === this.ID_VELHO_TESTAMENTO) {
      this.velhoTestamento = new Array<Livro>();

      this.livroService.findLivrosByTestamento(testamento).subscribe( livros => {
        this.velhoTestamento.push(...livros);
      });

    } else {
      this.novoTestamento = new Array<Livro>();

      this.livroService.findLivrosByTestamento(testamento).subscribe( livros => {
        this.novoTestamento.push(...livros);
      });
    }
  }

  public pesquisar() {

    if(this.palavraChave && this.palavraChave.trim().length > 0) {
      this.blockUI.start();
      this.livroService.search(this.palavraChave, 1).subscribe(result => {
        this.resultadoPesquisa = new Array<Pesquisa>();
        this.resultadoPesquisa.push(...result);
        
        this.countResultadoBusca = this.resultadoPesquisa.length;
        this.exibirResultado = true;
        this.blockUI.stop();
      });
    } else {
      this.toastr.warning('Para realizar uma pesquisa informe uma palavra-chave.');
    }
  }

  private abrirLivro(livro: number, capitulo: number, versao: number) {

    this.blockUI.start();
    this.versos = new Array();
    this.livro = livro;
    this.capitulo = capitulo;
    this.versao = versao;
    this.porcentagem = 0;
    this.numeroCapitulosLidos = 0;
    this.tipoProgressBar = 'danger';
    this.capituloLido = false;
    this.labelBotaoCapituloLido = 'Marcar capítulo como lido';

    this.livroService.abrirLivro(livro, capitulo, versao).subscribe(result => {
      this.versos.push(...result);
      this.blockUI.stop();
    });

    this.livroService.findLivroById(livro).subscribe(retorno => {
      
      this.livroDTO = this.setLivro(retorno[0]);
      this.totalItems = this.livroDTO.numeroCapitulos;
    });

    let usuario = this.idStorage.getIdentityPromise()['id'];

    if(usuario) {
      this.dashboard.carregaHistoricoGeral();
      this.livroService.historicoByLivro(usuario, livro).subscribe(retorno => {
        if(retorno && retorno.length > 0) {
          this.porcentagem = retorno[0]['porcentagem'];
          this.numeroCapitulosLidos = retorno[0]['capitulos_lidos'];
    
          if(this.porcentagem < 25) {
            this.tipoProgressBar = 'danger';
          } else if (this.porcentagem >= 25 && this.porcentagem < 50) {
            this.tipoProgressBar = 'warning';
          } else if (this.porcentagem >= 50 && this.porcentagem < 75) {
            this.tipoProgressBar = 'info';
          } else {
            this.tipoProgressBar = 'success';
          }
        }
        
      });

      this.livroService.historicoByLivroCapitulo(usuario, livro, this.capitulo).subscribe(retorno => {
        if(retorno !== '0') {
          this.capituloLido = true;
          this.labelBotaoCapituloLido = 'Leitura do capítulo concluída';
        }
      });
    }
    this.teste = true;
  }

  private abrirLivroIndice() {

    if(this.podeAbrirLivro) {
      this.livroPesquisa = 0;
      this.capituloPesquisa = 0;
      this.versiculoPesquisa = 0;
      this.capitulo = 1;
      this.teste = false;
      this.page = 1;
      this.abrirLivro(this.livro, this.capitulo, this.selecaoVersao.id);
    } else {
      this.toastr.error('É necessário selecionar um livro.');
    }
  }

  private abrirLivroPesquisa(livro: number, capitulo: number, versiculo: number) {

    this.livroPesquisa = livro;
    this.capituloPesquisa = capitulo;
    this.page = capitulo;
    this.teste = false;

    this.versiculoPesquisa = versiculo;
    this.abrirLivro(livro, capitulo, 1);
  }

  private setLivro(livro: Livro): Livro {
    
    let livroRetorno = new Livro();
    livroRetorno.nome = livro.nome;
    livroRetorno.abreviacao = livro.abreviacao;
    livroRetorno.capitulos = livro.capitulos;
    livroRetorno.categoria = livro.categoria;
    livroRetorno.numeroCapitulos = livro.numeroCapitulos;
    livroRetorno.posicao = livro.posicao;
    livroRetorno.testamento = livro.testamento;
    livroRetorno.id = livro.id;
    return livroRetorno;
  }

  private setVersao(versao: Versao): Versao {

    let versaoRetorno = new Versao();
    versaoRetorno.id = versao.id;
    versaoRetorno.nome = versao.nome;
    versaoRetorno.sigla = versao.sigla;
    versaoRetorno.ativo = versao.ativo;

    return versaoRetorno;
  }

  private getVersoes() {
    this.versoes = new Array<any>();

    this.livroService.findAllVersoes().subscribe( versoes => {
      this.versoes.push(... versoes);
    });
  }

  private iniciarVariaveis(): void {

    this.resultadoPesquisa = new Array<Pesquisa>();
    this.backgroundClass = 'white';
    this.livroDTO = new Livro();
    this.livros = new Array<Livro[]>();
    this.versao = 1;
    
    this.livroService.findVersaoById(this.versao).subscribe( versao => {
      this.selecaoVersao = this.setVersao(versao[0]);
    });
  }

  public marcarCapituloLido(): void {

    this.livroService.marcarCapitulo(this.idStorage.getIdentityPromise()['id'], this.livro, this.capitulo, this.versao).subscribe(retorno => {
      this.toastr.success('Leitura do capítulo ' + this.capitulo + ' do livro de ' + this.livroDTO.nome + ' concluída');
      this.capituloLido = true;
      this.labelBotaoCapituloLido = 'Leitura do capítulo concluída';
      this.abrirLivro(this.livro, this.capitulo, this.versao);
    });
  }

  public onChangeSwitchState(event): void {

    let modoNoturno = event.currentValue;
    if(modoNoturno) {
      this.backgroundClass = 'black';
    } else {
      this.backgroundClass = 'white';
    }
  }

  public limpar(): void {
    this.resultadoPesquisa = new Array<Pesquisa>();
    this.exibirResultado = false;
    this.palavraChave = '';
  }

  nextPage($event: any) {
    if(this.teste) {
      this.capitulo = $event;
      this.abrirLivro(this.livro, this.capitulo, this.versao);
    }

    this.teste = true;
  }

  rangeChanged(updatedRange): void {
    this.fontSize = updatedRange;
  }

  onChangeVersao() {

    this.livroService.findVersaoById(this.versao).subscribe( versao => {
      this.selecaoVersao = this.setVersao(versao[0]);
      this.abrirLivro(this.livro, this.capitulo, this.selecaoVersao.id);
    });
  }

  onSelectChange() {

    if(this.livro !== 0) {
      this.podeAbrirLivro = true;
    }
  }

  onTabSelect(tab: number) {
    this.livro = 0;
    this.podeAbrirLivro = false;  
  }
  
}
