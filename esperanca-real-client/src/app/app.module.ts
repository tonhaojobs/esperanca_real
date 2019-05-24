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
import { FabricaService } from './service/fabrica.service';
import { LeituraComponent } from './page/leitura/leitura.component';
import { MenuLeituraComponent } from './page/menu-leitura/menu-leitura.component';
import { PesquisaComponent } from './page/pesquisa/pesquisa.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndiceComponent,
    MenuComponent,
    MenuLeituraComponent,
    PesquisaComponent,
    LeituraComponent
  ],
  imports: [
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
    InfiniteScrollModule
  ],
  providers: [ LivroService, FabricaService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ LeituraComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
