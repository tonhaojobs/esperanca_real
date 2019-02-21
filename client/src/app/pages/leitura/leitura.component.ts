import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BibliaService } from 'src/app/services/biblia.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { VersoDTO } from 'src/app/model/verso-dto';
import { LivroDTO } from 'src/app/model/livro-dto';

@Component({
  selector: 'app-leitura',
  templateUrl: './leitura.component.html',
  styleUrls: ['./leitura.component.css']
})
export class LeituraComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  versao: number;
  livro: number;
  livroDTO: LivroDTO;
  capitulo: number;
  listVersos: Array<VersoDTO>;

  constructor(private route: ActivatedRoute, private bibliaService: BibliaService, public router: Router) { }

  ngOnInit() {

    window.sessionStorage.removeItem('SHOW_ITENS_SIDEBAR');
    window.sessionStorage.setItem('SHOW_ITENS_SIDEBAR', 'S');
    this.livroDTO = new LivroDTO()
    this.listVersos = new Array();

    this.route.params.subscribe(
      (params: any) => {
        this.livro = params['livro'];
        this.capitulo = params['capitulo'];
        this.versao = params['versao'];
      }
    )
    
    this.openBook(this.livro, this.capitulo, this.versao);   
  }

  private openBook(livro: number, capitulo: number, versao: number) {

    this.blockUI.start();
  
    window.sessionStorage.setItem('CURRENT_BOOK', livro.toString());
    window.sessionStorage.setItem('CURRENT_CHAPTER', capitulo.toString());
    window.sessionStorage.setItem('CURRENT_VERSION', versao.toString());
    
    this.bibliaService.openBook(livro, capitulo, versao).subscribe(retorno => {
      retorno.forEach((capitulo: VersoDTO) => {
        this.listVersos.push(capitulo);        
      });
    });

    this.bibliaService.findLivroById(livro).subscribe(retorno => {
      this.livroDTO = retorno[0];
    })

    this.blockUI.stop();
  }
  
}
