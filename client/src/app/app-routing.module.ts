import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SumarioComponent } from './pages/sumario/sumario.component';
import { LeituraComponent } from './pages/leitura/leitura.component';

const routes: Routes = [
  { path: 'sumario', component: SumarioComponent },
  { path: 'leitura/:livro/:capitulo', component: LeituraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
