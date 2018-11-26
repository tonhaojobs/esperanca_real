import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MeditacaoComponent } from './itens/meditacao/meditacao.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  declarations: [
    MeditacaoComponent,
    ...PAGES_COMPONENTS
  ],
  imports: [
    MaterialModule, 
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule, 
  ]
})
export class PagesModule { }
