import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  texto: string = 'Лампа для моих ног - твое слово,';
  texto2: string = 'и свет для моих путей.';
  referencia: string = 'Псалмы 119:105';
  
  constructor() { }

  ngOnInit() {
  }

}
