import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { VersaoDTO } from 'src/app/model/versao-dto';
import { BibliaService } from 'src/app/services/biblia.service';
import { Router } from '@angular/router';
import { LeituraComponent } from '../../leitura/leitura.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements AfterViewInit , OnInit {
  
  @Input() sideNav: LeituraComponent;
  
  listVersoes: Array<VersaoDTO>;
  
  constructor(private bibliaService: BibliaService, public router: Router) { }
  
  ngOnInit() {
    this.getVersoes();
  }

  ngAfterViewInit(): void {
    console.log(this.sideNav.teste);
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
    window.sessionStorage.removeItem('VERSION_DEFAULT');
    window.sessionStorage.setItem('VERSION_DEFAULT', id);
    
    if(window.sessionStorage.getItem('CURRENT_BOOK') && window.sessionStorage.getItem('CURRENT_CHAPTER')) {
      
      this.sideNav.openBook(Number(window.sessionStorage.getItem('CURRENT_BOOK')), Number(window.sessionStorage.getItem('CURRENT_CHAPTER')));
    }
  }

}