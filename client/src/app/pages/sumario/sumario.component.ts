import { Component, OnInit } from '@angular/core';
import { BibliaService } from 'src/app/services/biblia.service';
import { LivroDTO } from 'src/app/model/livro-dto';
import { TestamentoDTO } from 'src/app/model/testamento-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sumario',
  templateUrl: './sumario.component.html',
  styleUrls: ['./sumario.component.css']
})
export class SumarioComponent implements OnInit {
  
  listLivros: any[][];
  listTestamentos: Array<TestamentoDTO>;
  livro: LivroDTO;
  
  constructor(private bibliaService: BibliaService, public router: Router) { }

  ngOnInit() {
    this.livro = new LivroDTO();
    this.findAllTestamentos();
  }

  findAllTestamentos() {
    this.listTestamentos = new Array<TestamentoDTO>();
    this.listLivros = new Array<any>();
    this.bibliaService.findAllTestamentos().subscribe(listRetorno => {
      listRetorno.forEach(testamento => {
        this.listTestamentos.push(testamento);
        this.listLivros[testamento.id] = [];
        this.bibliaService.findLivrosByTestamento(testamento.id).subscribe(listRetorno => {
          listRetorno.forEach(livro => {
            
            this.listLivros[testamento.id].push(livro);
          });
        });
      });
    });
  }

  openModal(livro: LivroDTO) {
    
    this.livro = livro;
    this.livro.capitulos = new Array<number>();

    for(let index = 0; index < this.livro.numeroCapitulos; index++) {
      this.livro.capitulos.push(index + 1);
    }
  }
}
