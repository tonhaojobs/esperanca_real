import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselHolderComponent } from './page/template/utils/carousel-holder/carousel-holder.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselHolderComponent,
    HeaderComponent,
    IndiceComponent,
    MenuComponent
  ],
  imports: [
    MatTabsModule,
    MatStepperModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxPageScrollModule,
    TabModule,
    NgxPageScrollCoreModule
  ],
  providers: [ CarouselHolderComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
