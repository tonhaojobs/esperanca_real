import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-leitura',
  templateUrl: './menu-leitura.component.html',
  styleUrls: ['./menu-leitura.component.css']
})
export class MenuLeituraComponent implements OnInit {

  itensMenu: Array<any> = [
    { id: '#home', texto : 'Home' },
    { id: '#apresentacao', texto : 'Apresentação' },
    { id: '#indice', texto : 'Índice' },
    { id: '#login', texto : 'Entrar' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
