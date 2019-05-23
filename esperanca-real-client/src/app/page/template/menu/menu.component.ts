import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  itensMenu: Array<any> = [
    { id: '#home', texto : 'Home' },
    { id: '#pesquisa', texto : 'Pesquisar' },
    { id: '#apresentacao', texto : 'Apresentação' },
    { id: '#indice', texto : 'Índice' },
    { id: '#leitura', texto : 'Capitulo' },
    { id: '#login', texto : 'Entrar' }
  ];

  constructor() { }

  ngOnInit() {
  }

}