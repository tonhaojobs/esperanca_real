import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Directive, Input } from '@angular/core';
import { Livro } from 'src/app/model/livro';
import { LivroService } from 'src/app/service/livro.service';
import { FabricaService } from 'src/app/service/fabrica.service';
import { Pesquisa } from 'src/app/model/pesquisa';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {

  livros: Array<Livro[]>;

  resultadoPesquisa: Array<Pesquisa>;
  palavraChave: string;
  exibirResultado: boolean;
  countResultadoBusca: number;
  menorIndex = 0;
  maiorIndex = 10;

  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  testamentos: Array<any> = [
    { id: 1, descricao: 'Velho Testamento' },
    { id: 2, descricao: 'Novo Testamento' }
  ];

  fabricaService: FabricaService;

  constructor(
    private livroService: LivroService, 
    @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef, 
    @Inject(FabricaService) fabricaService: FabricaService, ) { 
      this.fabricaService = fabricaService;
      this.viewContainerRef = viewContainerRef;
      this.resultadoPesquisa = new Array<Pesquisa>();
  }

  ngOnInit() {
    this.livros = new Array<Livro[]>();
    this.getLivros();
  }

  getLivros(): void {

    this.testamentos.forEach(testamento => {
      let id = testamento.id;
      this.livros[id] = new Array<Livro>();
      this.livroService.findLivrosByTestamento(id).subscribe( livros => {
        this.livros[id].push(...livros);
      });
    });
  }

  public pesquisar() {

    this.exibirResultado = false;

    this.livroService.search(this.palavraChave, 1).subscribe(result => {
      this.resultadoPesquisa = new Array<Pesquisa>();
      this.resultadoPesquisa.push(...result);

      this.countResultadoBusca = this.resultadoPesquisa.length;
    });
  }

  abrirLivro(livro: number, capitulo: number) {
    
    localStorage.setItem('idLivro', livro.toString());
    localStorage.setItem('numeroCapitulo', capitulo.toString());
    
    this.viewContainerRef.remove();
    this.fabricaService.setRootViewContainerRef(this.viewContainerRef);
    this.fabricaService.addComponent();
  }

  abrirLivroPesquisa(livro: number, capitulo: number, versiculo: number) {
    localStorage.setItem('numeroVersiculo', versiculo.toString());
    this.abrirLivro(livro, capitulo);
  }

}
