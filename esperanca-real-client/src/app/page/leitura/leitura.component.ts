import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Livro } from 'src/app/model/livro';
import { LivroService } from 'src/app/service/livro.service';
import { Verso } from 'src/app/model/verso';

@Component({
  selector: 'app-leitura',
  templateUrl: './leitura.component.html',
  styleUrls: ['./leitura.component.css']
})
export class LeituraComponent implements OnInit {
  
  public idLivro: number;
  versos: Array<Verso>;
  versao: number;
  livro: Livro;
  livroSelecionado: boolean;
  bgClass: string = 'white';
  numeroCapitulo: number;
  totalItems: number;
  numPage: number;
  numCapitulo: number;
  numeroVersiculo: number;
  
  constructor(private livroService: LivroService) { }
  
  ngOnInit() {
    this.livro = new Livro();
    this.idLivro = Number(localStorage.getItem('idLivro'));
    this.numCapitulo = Number(localStorage.getItem('numeroCapitulo'));
    this.numeroVersiculo = Number(localStorage.getItem('numeroVersiculo'));
    
    if(localStorage.getItem('numeroCapitulo')) {
      this.numeroCapitulo = Number(localStorage.getItem('numeroCapitulo'));
      localStorage.removeItem('numeroCapitulo');
    }
    
    this.abrirLivro(this.idLivro, this.numeroCapitulo, 1);
  }

  abrirLivro($event: any, capitulo: number, versao: number) {

    this.livroSelecionado = true;
    
    this.idLivro = $event;
    this.versao = versao;
    this.versos = new Array();
    this.numCapitulo = capitulo;
    this.numPage = capitulo;

    this.livroService.abrirLivro($event, capitulo, versao).subscribe(result => {
      this.versos.push(...result);
    });

    this.livroService.findLivroById(this.idLivro).subscribe(retorno => {
      
      this.livro = this.setLivro(retorno[0]);
      this.totalItems = this.livro.numeroCapitulos;
     });

     this.limparStorage();
  }

  limparStorage() {
    localStorage.removeItem('idLivro');
    localStorage.removeItem('numeroCapitulo');
    localStorage.removeItem('numeroVersiculo');
  }

  nextPage($event: any) {
    this.numPage = $event;
    this.abrirLivro(this.idLivro, this.numPage, this.versao);
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
}
