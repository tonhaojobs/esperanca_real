import { Component, OnInit } from '@angular/core';
import { Livro } from 'app/model/livro';
import { LivroService } from 'app/services/livro.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {

  ID_VELHO_TESTAMENTO = 1;
  ID_NOVO_TESTAMENTO = 2;

  private velhoTestamento: Array<Livro>;
  private novoTestamento: Array<Livro>;

  selecaoVelhoTestamento: Livro = new Livro();
  selecaoNovoTestamento: Livro = new Livro();

  constructor(private livroService: LivroService) { }

  ngOnInit() {
    this.getLivros(1);
    this.getLivros(2);
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

}
