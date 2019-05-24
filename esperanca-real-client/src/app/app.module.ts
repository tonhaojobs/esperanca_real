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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndiceComponent,
    MenuComponent
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
    NgxPageScrollCoreModule
  ],
  providers: [ LivroService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
