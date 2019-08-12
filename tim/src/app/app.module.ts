import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { IndiceComponent } from './pages/indice/indice.component';
import { PublicComponent } from './pages/public/public.component';
import { HeaderComponent } from './pages/header/header.component';
import { LivroService } from './services/livro.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BibliaComponent } from './pages/biblia/biblia.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NouisliderModule } from 'ng2-nouislider';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    IndiceComponent,
    PublicComponent,
    HeaderComponent,
    BibliaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    NgxPageScrollCoreModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPageScrollModule,
    JwBootstrapSwitchNg2Module,
    NouisliderModule
  ],
  providers: [ LivroService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
