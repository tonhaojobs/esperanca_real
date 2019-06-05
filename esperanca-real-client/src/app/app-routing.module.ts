import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './page/public/public.component';
import { PrivateComponent } from './page/private/private.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  
  { path: 'public', component: PublicComponent },
  { path: 'private', component: PrivateComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'public' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
