import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { IndiceComponent } from './pages/indice/indice.component';
import { PublicComponent } from './pages/public/public.component';
import { HeaderComponent } from './pages/header/header.component';
import { LivroService } from './services/livro.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BibliaComponent } from './pages/biblia/biblia.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NouisliderModule } from 'ng2-nouislider';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { IdentityStorage } from './_models/identity-storage';
import { AuthenticationService } from './_services/authentication.service';
import { AuthInterceptor } from './_guards/auth.interceptor';
import { AngularWebStorageModule } from 'angular-web-storage';
import { PrivateComponent } from './pages/private/private.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ApresentacaoComponent } from './pages/apresentacao/apresentacao.component';
import { BlockUIModule } from 'ng-block-ui';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    IndiceComponent,
    PublicComponent,
    HeaderComponent,
    BibliaComponent,
    LoginComponent,
    PrivateComponent,
    DashboardComponent,
    ApresentacaoComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    NgxPageScrollCoreModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPageScrollModule,
    JwBootstrapSwitchNg2Module,
    NouisliderModule,
    AngularWebStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgCircleProgressModule.forRoot(),
    BlockUIModule.forRoot({
      message: 'Carregando...',
      delayStop: 750
    })
  ],
  providers: [ 
    LivroService,
    AuthenticationService, 
    IdentityStorage, 
    AuthGuard,
    DashboardComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
