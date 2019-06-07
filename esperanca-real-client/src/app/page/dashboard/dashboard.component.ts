import { Component, OnInit } from '@angular/core';
import { IdentityStorage } from 'src/app/_models/identity-storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nomeUsuario: string;

  constructor(private idStorage: IdentityStorage) { }

  ngOnInit() {
    this.nomeUsuario = this.idStorage.getIdentity()['nome'];
  }

}
