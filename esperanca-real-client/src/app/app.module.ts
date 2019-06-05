import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './page/template/header/header.component';
import { MenuComponent } from './page/template/menu/menu.component';
import { IndiceComponent } from './page/indice/indice.component';

import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { TabModule } from 'angular-tabs-component';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { OwlModule  } from 'ngx-owl-carousel';
import { LivroService } from './service/livro.service';
import { LeituraComponent } from './page/leitura/leitura.component';
import { MenuLeituraComponent } from './page/menu-leitura/menu-leitura.component';
import { PesquisaComponent } from './page/pesquisa/pesquisa.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './page/login/login.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalComponent } from './page/template/modal/modal.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselHolderComponent } from './page/template/carousel-holder/carousel-holder.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AuthenticationService } from './_services/authentication.service';
import { IdentityStorage } from './_models/identity-storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndiceComponent,
    MenuComponent,
    MenuLeituraComponent,
    PesquisaComponent,
    LeituraComponent,
    LoginComponent,
    ModalComponent,
    CarouselHolderComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatStepperModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OwlModule,
    NgxPageScrollModule,
    TabModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgxPageScrollCoreModule,
    NgxPaginationModule,
    InfiniteScrollModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    CarouselModule,
    AngularWebStorageModule
  ],
  providers: [ LivroService, AuthenticationService, IdentityStorage ],
  bootstrap: [ AppComponent ],
  entryComponents: [ LeituraComponent, ModalComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
