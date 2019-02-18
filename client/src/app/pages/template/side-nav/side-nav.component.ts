import { Component, OnInit, Inject } from '@angular/core';
import { VersaoDTO } from 'src/app/model/versao-dto';
import { BibliaService } from 'src/app/services/biblia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  listVersoes: Array<VersaoDTO>;

  constructor(private bibliaService: BibliaService, public router: Router) { }

  ngOnInit() {
    this.getVersoes();
  }
  
  getVersoes() {
    this.listVersoes = new Array<VersaoDTO>();
    this.bibliaService.findAllVersoes().subscribe(retorno => {
      retorno.forEach(versao => {
        this.listVersoes.push(versao);
      });
    });
  }

  selecionarVersao(id: string) {

    if(window.sessionStorage.getItem('CURRENT_BOOK') && window.sessionStorage.getItem('CURRENT_CHAPTER')) {
        
    }

    window.sessionStorage.removeItem('VERSION_DEFAULT');
    window.sessionStorage.setItem('VERSION_DEFAULT', id);
    console.log(window.sessionStorage.getItem('VERSION_DEFAULT'));
    
  }

}