import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-meditacao',
  templateUrl: './meditacao.component.html',
  styleUrls: ['./meditacao.component.css']
})
export class MeditacaoComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  displayedColumns: string[] = ['descricao', 'ano', 'permanente', 'ativo', 'star'];
  dataSource = new MatTableDataSource<Devocional>(DEVOCINAIS);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      //    firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      //  secondCtrl: ['', Validators.required]
    });

    this.dataSource.paginator = this.paginator;
  }

  edit(id: number) {
    console.log(id);
  }
}

export interface Devocional {
  id: number,
  descricao: string;
  ano: number;
  permanente: boolean;
  ativo: boolean;
}

const DEVOCINAIS: Devocional[] = [
  { id: 1, descricao: 'Devocional Esperança Real', ano: 2018, permanente: true, ativo: false },
  { id: 2, descricao: 'Meditação Matinal', ano: 2018, permanente: false, ativo: true },
  { id: 3, descricao: 'Meditação Mulher', ano: 2018, permanente: false, ativo: true },
  { id: 4, descricao: 'Inspitação Juvenil', ano: 2018, permanente: false, ativo: true },
  { id: 5, descricao: 'Janelas para Vida', ano: 2018, permanente: true, ativo: true },
  { id: 6, descricao: 'Meditação Por do Sol', ano: 2018, permanente: true, ativo: true },
  { id: 7, descricao: 'Devocional Infantil', ano: 2018, permanente: true, ativo: true },
  { id: 8, descricao: 'Adoração Infantil', ano: 2018, permanente: true, ativo: true }
];