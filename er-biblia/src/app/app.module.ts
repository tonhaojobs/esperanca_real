import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/template/header/header.component';
import { SumarioComponent } from './pages/sumario/sumario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SumarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
