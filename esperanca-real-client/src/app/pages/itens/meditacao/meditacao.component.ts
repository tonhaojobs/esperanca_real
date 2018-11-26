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

  displayedColumns: string[] = ['descricao', 'ano', 'permanente', 'ativo'];
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

}

export interface Devocional {
  descricao: string;
  ano: number;
  permanente: boolean;
  ativo: boolean;
}

const DEVOCINAIS: Devocional[] = [
  {descricao: 'Devocional Esperança Real', ano: 2018, permanente: true, ativo: false},
  {descricao: 'Meditação Matinal', ano: 2018, permanente: false, ativo: true},
  {descricao: 'Meditação Mulher', ano: 2018, permanente: false, ativo: true},
  {descricao: 'Inspitação Juvenil', ano: 2018, permanente: false, ativo: true},
  {descricao: 'Janelas para Vida', ano: 2018, permanente: true, ativo: true},
  {descricao: 'Meditação Por do Sol', ano: 2018, permanente: true, ativo: true},
  {descricao: 'Devocional Infantil', ano: 2018, permanente: true, ativo: true},
  {descricao: 'Adoração Infantil', ano: 2018, permanente: true, ativo: true}
];