import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Params } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { SamplesService } from './samples.service';
// import { BackgroundFxService } from './background-fx.service';

import { FilterPipe } from './filter.pipe';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailsComponent } from './gallery/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    GalleryComponent,
    HomeComponent,
    PageNotFoundComponent,
    DetailsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  // providers: [SamplesService, BackgroundFxService],
  providers: [SamplesService],
  bootstrap: [AppComponent]
})

export class AppModule { }
