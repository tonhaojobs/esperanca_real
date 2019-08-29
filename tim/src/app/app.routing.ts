import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './pages/public/public.component';
import { AuthGuard } from './_guards/auth.guard';
import { PrivateComponent } from './pages/private/private.component';

const routes: Routes =[
  
    { path: '', redirectTo: 'public', pathMatch: 'full' },
    { path: 'private', component: PrivateComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'public' },
    { path: 'public', component: PublicComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
