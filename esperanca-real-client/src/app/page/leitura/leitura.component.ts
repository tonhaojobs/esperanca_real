import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Livro } from 'src/app/model/livro';
import { LivroService } from 'src/app/service/livro.service';
import { Verso } from 'src/app/model/verso';
import { Pesquisa } from 'src/app/model/pesquisa';
import { TooltipPosition } from '@angular/material';
import { LocalStorageService } from 'angular-web-storage';
import { IdentityStorage } from 'src/app/_models/identity-storage';
import { Versao } from 'src/app/model/versao';

@Component({
  selector: 'app-leitura',
  templateUrl: './leitura.component.html',
  styleUrls: ['./leitura.component.css']
})
export class LeituraComponent implements OnInit {


  /* INDICE */
  private livros: Array<Livro[]>;
  private testamentos: Array<any> = [
    { id: 1, descricao: 'Velho Testamento' },
    { id: 2, descricao: 'Novo Testamento' }
  ];

  private versoes: Array<any>;

  /* PESQUISA */
  private palavraChave: string;
  private palavraChavePesquisa: string;
  private exibirResultado: boolean;
  private resultadoPesquisa: Array<Pesquisa>;
  private countResultadoPesquisa: number;
  private livroPesquisa: number;
  private capituloPesquisa: number;
  private versiculoPesquisa: number;

  /* LEITURA */
  private livroDTO: Livro;
  private livro: number;
  private capitulo: number;
  private versao: number;
  private versos: Array<Verso>;
  private totalItems: number;

  /* SIDEMENU */
  private backgroundClass: string; 
  private fontSize: number;

  public loading = false;
  public tooltipPosition: TooltipPosition = 'right';
  private identityStorage: IdentityStorage;

  private versaoDTO: Versao; 

  constructor(
    private livroService: LivroService,
    public local: LocalStorageService,
    private idStorage: IdentityStorage) { 
      this.identityStorage = this.idStorage;
    }

  ngOnInit(): void {
    this.iniciarVariaveis();
    this.getLivros();
    this.abrirLivro(1, 1, 1);
    this.getVersoes();
  }

  private getLivros(): void {

    this.testamentos.forEach(testamento => {
      let id = testamento.id;
      this.livros[id] = new Array<Livro>();
      this.livroService.findLivrosByTestamento(id).subscribe( livros => {
        this.livros[id].push(...livros);
      });
    });
  }

  private getVersoes() {

    this.livroService.findAllVersoes().subscribe( versoes => {
      this.versoes.push(... versoes);
    });
  }

  public pesquisar(): void {

    this.exibirResultado = false;
    this.palavraChavePesquisa = this.palavraChave;

    this.livroService.search(this.palavraChave, 1).subscribe(result => {
      this.resultadoPesquisa = new Array<Pesquisa>();
      this.resultadoPesquisa.push(...result);

      this.countResultadoPesquisa = this.resultadoPesquisa.length;
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

  private iniciarVariaveis(): void {
    this.livroDTO = new Livro();
    this.livros = new Array<Livro[]>();
    this.versao = 1;
    this.getVersao(this.versao);

    this.backgroundClass = 'white';
    this.fontSize = 14;
    this.resultadoPesquisa = new Array<Pesquisa>();
    this.versoes = new Array<any>();
  }

  alternarModoDiaENoite() {
    this.backgroundClass = (this.backgroundClass == 'white') ? 'dark' : 'white';
  }

  private aumentarTamanhoFonte() {
    if(this.fontSize <= 22) {
      this.fontSize += 1;    
    }
  }

  private diminuirTamanhoFonte() {
    if(this.fontSize >= 10) {    
      this.fontSize -= 1;
    }
  }

  marcarCapitulo() {

    let usuario = this.identityStorage.getIdentity()['id'];

    this.livroService.marcarCapitulo(usuario, this.livro, this.capitulo, this.versao).subscribe(result => {
      console.log(result);
    },
    error => {
      console.log(error.error);
    });
  }

  nextPage($event: any) {
    this.capitulo = $event;
    this.abrirLivro(this.livro, this.capitulo, this.versao);
  }

  onVersaoChanged(versao: number) {

    let livro = (this.livroPesquisa && this.livroPesquisa !== 0) ? this.livroPesquisa : 1;
    let capitulo = (this.capituloPesquisa && this.capituloPesquisa !== 0) ? this.capituloPesquisa : 1;
    this.getVersao(versao);

    this.abrirLivro(livro, capitulo, versao);
  }

  getVersao(id: number) {
    this.versaoDTO = new Versao();
    this.livroService.findVersaoById(id).subscribe( result => {
      this.versaoDTO = this.setVersao(result[0]);
    });
  }

  usuarioLogado(): boolean {
    return this.identityStorage.authenticationPresent();
  }

}
