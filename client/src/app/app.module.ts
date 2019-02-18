import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/template/header/header.component';
import { FooterComponent } from './pages/template/footer/footer.component';
import { SumarioComponent } from './pages/sumario/sumario.component';
import { BibliaService } from './services/biblia.service';
import { HttpClientModule } from '@angular/common/http';
import { LeituraComponent } from './pages/leitura/leitura.component';
import { BlockUIModule } from 'ng-block-ui';
import { ToasterModule } from 'angular2-toaster';
import { SideNavComponent } from './pages/template/side-nav/side-nav.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LeituraComponent,
    SumarioComponent,
    SideNavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StorageServiceModule,
    BlockUIModule.forRoot(),
    ToasterModule.forRoot(),
  ],
  providers: [
    BibliaService,
    LocalStorageService
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
