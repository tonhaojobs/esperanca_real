import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiceComponent } from './page/indice/indice.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'indice', component: IndiceComponent },
  { path: 'public', component: AppComponent },
  { path: 'private', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
