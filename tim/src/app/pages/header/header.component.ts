import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private verso: any;
  private styles: any;

  private versos = [
    {id: 1, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 2, texto : 'Elevo os meus olhos para os montes; de onde me vem o socorro? O meu socorro vem do Senhor, que fez os céus e a terra.', referencia: 'Salmos 121:1-2' , imagem: 'mountain.jpg'},
    {id: 3, texto : 'O Senhor é meu pastor, nada me faltará.', referencia: 'Salmos 24:1', imagem: 'sheep.jpg'},
    {id: 4, texto : 'Se confessarmos os nossos pecados, ele é fiel e justo para perdoar os nossos pecados e nos purificar de toda injustiça.', referencia: '1 João 1:9', imagem: 'prayer-1.jpg'},
    {id: 5, texto : 'Darei a vocês um coração novo e porei um espírito novo em vocês; tirarei de vocês o coração de pedra e, em troca, darei um coração de carne.', referencia: 'Ezequiel 36:26', imagem: 'heart-1.jpg'},
    {id: 6, texto : 'Por que Deus amou o mundo de tal maneira que deu o Seu filho unigênito para que todo aquele que Nele crê não pereça mas tenha a vida eterna.', referencia: 'João 3:16', imagem: 'love-1.jpg'},
    /*
    {id: 7, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 8, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 9, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 10, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 11, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 12, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 13, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 14, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 15, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 16, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},
    {id: 17, texto : 'Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos.', referencia: 'Salmos 119:105', imagem: 'lighthouse.jpg'},*/
  ];

  constructor() {}
  
  ngOnInit() {
    this.setMyStyles();
  }
  
  setMyStyles() {

    let numero = Math.floor(Math.random() * (/*(this.versos.length - 1)*/6 - 1 + 1)) + 1;
    this.verso = this.versos.find(x => x.id == numero);
    let imagem: string = this.verso.imagem;

    this.styles = {
      'background-image': 'url(assets/img/bg/'+imagem+')'
    };

    return this.styles;
  }

}
