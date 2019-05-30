import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiceComponent } from './page/indice/indice.component';

const routes: Routes = [
  { path: 'indice', component: IndiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
