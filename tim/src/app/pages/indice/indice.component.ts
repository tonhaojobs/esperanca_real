import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {

  livros = [
    { id: 1, nome: 'Mateus' },
    { id: 2, nome: 'Marcos' },
    { id: 3, nome: 'Lucas' },
    { id: 4, nome: 'João' }
  ];

  selecao: string = 'selecione';

  constructor() { }

  ngOnInit() {
  }

  teste(event: string) {
    console.log(event);
    this.selecao = event;
    
  }

  onSelectChange(key: any, value: string) {
    this.selecao = value;
  }

}
