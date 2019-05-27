import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-leitura',
  templateUrl: './menu-leitura.component.html',
  styleUrls: ['./menu-leitura.component.css']
})
export class MenuLeituraComponent implements OnInit {

  itensMenu: Array<any> = [
    { id: '#home', texto : 'Home' },
    { id: '#indice', texto : 'Índice' },
    { id: '#pesquisa', texto : 'Pesquisa' },
    { id: '#leitura', texto : 'Leitura' },
    { id: '#login', texto : 'Entrar' }
  ];
  constructor() { }

  ngOnInit() {
  }

  modoDia() {
    localStorage.setItem('bg-color', 'day');
  }

  modoNoite() {
    localStorage.setItem('bg-color', 'night');
  }

}
