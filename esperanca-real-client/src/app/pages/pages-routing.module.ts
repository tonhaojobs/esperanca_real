import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeditacaoComponent } from './itens/meditacao/meditacao.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  
  path: '',
  component: PagesComponent,
  children:[{
    path: 'meditacao',
    component: MeditacaoComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
