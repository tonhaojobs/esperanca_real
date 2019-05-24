import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Pesquisa } from 'src/app/model/pesquisa';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  resultadoPesquisa: Array<Pesquisa>;
  palavraChave: string;
  exibirResultado: boolean;
  countResultadoBusca: number;
  menorIndex = 0;
  maiorIndex = 10;

  constructor(private livroService: LivroService) { }

  ngOnInit() {
    this.resultadoPesquisa = new Array<Pesquisa>();
  }

  public pesquisar() {

    this.exibirResultado = false;

    this.livroService.search(this.palavraChave, 1).subscribe(result => {
      this.resultadoPesquisa = new Array<Pesquisa>();
      this.resultadoPesquisa.push(...result);

      this.countResultadoBusca = this.resultadoPesquisa.length;
    });
  }

  abrirLivro(capitulo, versiculo) {
    console.log(capitulo + ":" + versiculo);
    
  }
}
