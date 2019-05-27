import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

}