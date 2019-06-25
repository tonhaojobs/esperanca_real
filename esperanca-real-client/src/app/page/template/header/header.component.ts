import { Component, OnInit } from '@angular/core';
import { IdentityStorage } from 'src/app/_models/identity-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  home: string = "home";
  menuOpen: boolean = false;
  menuLink: string = 'menu_';

  nomeUsuario: string;

  constructor(private idStorage: IdentityStorage) { }

  ngOnInit() {
    this.nomeUsuario = this.idStorage.getIdentity()['nome'];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if(!this.menuOpen) {
      this.menuLink = "menu_";
    } else {
      this.menuLink = "home";
    }
  }

  gotoHome() {
    this.menuOpen = false;
    this.menuLink = "menu_";
  }

}