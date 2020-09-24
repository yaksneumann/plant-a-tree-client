import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseAreaComponent } from './choose-area/choose-area.component';
import { ChoosePlantsComponent } from './choose-plants/choose-plants.component';
import { ChooseTimeComponent } from './choose-time/choose-time.component';
import { DonationDetailsComponent } from './donation-details/donation-details.component';
import { DonorsDetailsComponent } from './donors-details/donors-details.component';
import { MoreItemsComponent } from './more-items/more-items.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CeremonyDetailsComponent } from './ceremony-details/ceremony-details.component';
import { DestinationComponent } from './destination/destination.component';
import { CirtificateComponent } from './cirtificate/cirtificate.component';
import { TestPageComponent } from './test-page/test-page.component';


//Added by Moshe
import { ChooseOrderPlantsComponent } from './choose-orderplants/choose-orderplants.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
//import { ZoomComponent } from './zoom/zoom.component';


const routes: Routes = [
     {path: '', pathMatch: 'full', component: HomePageComponent},   
    { path: 'choose-orderplants', component: ChooseOrderPlantsComponent },
    { path: 'donors-details', component: DonorsDetailsComponent },
    { path: 'donation-details', component: DonationDetailsComponent },
    { path: 'payment-page', component: PaymentComponent },
    { path: 'payment-successful', component: PaymentSuccessfulComponent },
    { path: 'ceremony-details', component:  CeremonyDetailsComponent },
    { path: 'cirtificate', component:  CirtificateComponent },
    //{ path: 'destination', component: DestinationComponent },
    
   // { path: 'zoom', component:  ZoomComponent},
    // { path: 'home-page', component: HomePageComponent },
   // { path: 'choose-area', component: ChooseAreaComponent },
   // { path: 'choose-time', component: ChooseTimeComponent },
    //{ path: 'choose-plants', component: ChoosePlantsComponent },
      //  { path: 'more-items', component: MoreItemsComponent },


   { path: 'dude', component:  TestPageComponent },
   { path: 'contact-us', component:  ContactUsComponent},
    
    { path: '**', redirectTo: '' }
   // { path: '**', redirectTo: 'home-page' }
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }