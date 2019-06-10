import { Component, OnInit } from '@angular/core';
import { IdentityStorage } from 'src/app/_models/identity-storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private itensMenu: Array<any>;
  private identityStorage: IdentityStorage;

  constructor(private idStorage: IdentityStorage) {
    this.identityStorage = this.idStorage;
  }

  ngOnInit() {
    this.itensMenu = new Array<any>();

    if(this.idStorage.authenticationPresent()) {
      
      this.itensMenu = [
        { id: '#home', texto : 'Home' },
        { id: '#dashboard', texto : 'Dashboard' },
        { id: '#indice', texto : 'Índice' },
        { id: '#pesquisa', texto : 'Pesquisa' },
        { id: '#leitura', texto : 'Leitura' }
      ];
      
    } else {

      this.itensMenu = [
        { id: '#home', texto : 'Home' },
        { id: '#indice', texto : 'Índice' },
        { id: '#pesquisa', texto : 'Pesquisa' },
        { id: '#leitura', texto : 'Leitura' },
        { id: '#login', texto : 'Login' }
      ];
    }
  }

}