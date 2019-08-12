import { Component, OnInit } from '@angular/core';
import { Livro } from 'app/model/livro';
import { LivroService } from 'app/services/livro.service';
import { Pesquisa } from 'app/model/pesquisa';
import { Verso } from 'app/model/verso';
import { Versao } from 'app/model/versao';

@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.scss']
})
export class BibliaComponent implements OnInit {

  simpleSlider = 20;
  doubleSlider = [20, 40];
  state_default: boolean = true;
  focus: any;

  ID_VELHO_TESTAMENTO = 1;
  ID_NOVO_TESTAMENTO = 2;

  private velhoTestamento: Array<Livro>;
  private novoTestamento: Array<Livro>;

  selecaoVelhoTestamento: Livro = new Livro();
  selecaoNovoTestamento: Livro = new Livro();

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

  constructor(private livroService: LivroService) { }

  ngOnInit() {
    this.iniciarVariaveis();
    this.getLivros(1);
    this.getLivros(2);
    this.getVersoes();

    this.abrirLivro(1, 1, 1);
    this.resultadoPesquisa = new Array<Pesquisa>();
    this.backgroundClass = 'white';
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

  onSelectChange(key: Livro, testamento: number) {

    if(testamento === this.ID_VELHO_TESTAMENTO) {
      this.selecaoVelhoTestamento = key;
    } else {
      this.selecaoNovoTestamento = key;
    }
  }

  teste() {
    console.log('teste');
    
  }

  public pesquisar() {
      
    this.livroService.search(this.palavraChave, 1).subscribe(result => {
      this.resultadoPesquisa = new Array<Pesquisa>();
      this.resultadoPesquisa.push(...result);
      
      this.countResultadoBusca = this.resultadoPesquisa.length;
      this.exibirResultado = true;
    });
  }




  private abrirLivro(livro: number, capitulo: number, versao: number) {
  
    this.versos = new Array();
    this.livro = livro;
    this.capitulo = capitulo;
    this.versao = versao;

    this.livroService.abrirLivro(livro, capitulo, versao).subscribe(result => {
      this.versos.push(...result);
    });

    this.livroService.findLivroById(livro).subscribe(retorno => {
      
      this.livroDTO = this.setLivro(retorno[0]);
      this.totalItems = this.livroDTO.numeroCapitulos;
     });
  }

  private abrirLivroIndice(livro: number, capitulo: number, versao: number) {
    
    this.livroPesquisa = 0;
    this.capituloPesquisa = 0;
    this.versiculoPesquisa = 0;

    this.abrirLivro(livro, capitulo, versao);
  }

  private abrirLivroPesquisa(livro: number, capitulo: number, versiculo: number) {

    this.livroPesquisa = livro;
    this.capituloPesquisa = capitulo;
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
    console.log(this.versoes);
    
  }

  private iniciarVariaveis(): void {
    this.livroDTO = new Livro();
    this.livros = new Array<Livro[]>();
    this.versao = 1;
    /*
    this.getVersao(this.versao);

    this.backgroundClass = 'white';
    this.fontSize = 14;
    this.resultadoPesquisa = new Array<Pesquisa>();
    this.versoes = new Array<any>();*/
  }


  public onChangeSwitchState(event): void {

    let modoNoturno = event.currentValue;
    
    if(modoNoturno) {
      this.backgroundClass = 'black';
    } else {
      this.backgroundClass = 'white';
    }
  }

  nextPage($event: any) {
    this.capitulo = $event;
    this.abrirLivro(this.livro, this.capitulo, this.versao);
  }
}
