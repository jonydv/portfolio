import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ScrollToTopModule } from './shared/components/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    ScrollToTopModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
