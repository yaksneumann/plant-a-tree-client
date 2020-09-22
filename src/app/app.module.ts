import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader  } from '@ngx-translate/http-loader';

import { ChooseAreaComponent } from './choose-area/choose-area.component';
import { ChoosePlantsComponent } from './choose-plants/choose-plants.component';
// Added by Moshe
import { ChooseOrderPlantsComponent } from './choose-orderplants/choose-orderplants.component';
// End Added
import { ChooseTimeComponent } from './choose-time/choose-time.component';
import { DonationDetailsComponent } from './donation-details/donation-details.component';
import { DonorsDetailsComponent } from './donors-details/donors-details.component';
import { MoreItemsComponent } from './more-items/more-items.component';
import { HeaderComponent } from './header/header.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CeremonyDetailsComponent } from './ceremony-details/ceremony-details.component';
import { TestPageComponent } from './test-page/test-page.component';
import { DestinationComponent } from './destination/destination.component';
import { CirtificateComponent } from './cirtificate/cirtificate.component';
import { TreasureHuntComponent } from './treasure-hunt/treasure-hunt.component';
import { ZoomComponent } from './zoom/zoom.component';
//import { routing } from './app-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ContactUsComponent } from './contact-us/contact-us.component';
 

//for ngx-translate
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/');
  //return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    ChooseAreaComponent,
    ChoosePlantsComponent,
    ChooseOrderPlantsComponent,
    ChooseTimeComponent,
    DonationDetailsComponent,
    DonorsDetailsComponent,
    MoreItemsComponent,
    HeaderComponent,
    PaymentComponent,
    PaymentSuccessfulComponent,
    PopupModalComponent,
    HomePageComponent,
    CeremonyDetailsComponent,
    TestPageComponent,
    DestinationComponent,
    CirtificateComponent,
    TreasureHuntComponent,
    ZoomComponent,
    ContactUsComponent
  ],
  imports: [
    //routing,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

