import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { RatingComponent } from './components/rating/rating.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    RatingComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass:TimeInterceptor, multi:true  },
    {provide : HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
