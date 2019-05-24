import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/model/livro';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {

  livros: Array<Livro[]>;

  testamentos: Array<any> = [
    { id: 1, descricao: 'Velho Testamento' },
    { id: 2, descricao: 'Novo Testamento' }
  ];

  constructor(private livroService: LivroService) { }

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

}