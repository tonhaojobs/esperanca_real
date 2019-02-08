import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SumarioComponent } from './pages/sumario/sumario.component';

const routes: Routes = [
  { path: 'sumario', component: SumarioComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
