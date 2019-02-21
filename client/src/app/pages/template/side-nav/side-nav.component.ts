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
  showSideBar: boolean;

  constructor(private bibliaService: BibliaService, public router: Router) { }

  ngOnInit() {
    if(window.sessionStorage.getItem('SHOW_ITENS_SIDEBAR') === 'S') {
      this.showSideBar = true;
    } else {
      this.showSideBar = false;
    }

    this.getVersoes();
  }
  
  getVersoes() {
    this.listVersoes = new Array<VersaoDTO>();
    this.bibliaService.findAllVersoes().subscribe(retorno => {
      retorno.forEach(versao => {
        this.listVersoes.push(versao);
      });
    });
    console.log(this.listVersoes);
    
  }

  selecionarVersao(id: string) {
    window.sessionStorage.removeItem('CURRENT_VERSION');
    window.sessionStorage.setItem('CURRENT_VERSION', id);

    if(window.sessionStorage.getItem('CURRENT_BOOK') && window.sessionStorage.getItem('CURRENT_CHAPTER')) {
      window.location.reload();
      this.router.navigate(['/leitura/', window.sessionStorage.getItem('CURRENT_BOOK'), window.sessionStorage.getItem('CURRENT_CHAPTER'), window.sessionStorage.getItem('CURRENT_VERSION')]);
    }
    
  }
}