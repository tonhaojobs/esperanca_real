import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private verso: string = "Lâmpada para os meus pés é a Tua palavra, e luz para os meus caminhos. Salmos 119:105";

  constructor() { }

  ngOnInit() {
  }

}
