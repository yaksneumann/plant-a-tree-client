import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from '../services/modal.service';

import { ZoomApiService } from 'src/app/services/zoom-api.service';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private modalService: ModalService, 
    private zoomApi: ZoomApiService) { }

  errMsg: string = '';
  ceremonyID: number;
  //plantingCenter: number;
  yaaransName: string = '';
  yaaransPhone: string = '';
  donationSum: any = '';
  forestName: string = '';
  donersDetailsObj: any = {
    countryId: 0,
    email: "",
    donorsTitle: "",
    firstName: "",
    lastName: "",
    phone: ""
  };
  confirmationNumber: any = '';
  ceremonyTime: string = '';
  ceremonyDate: string = '';

  ngOnInit() {

    let donersDetailsObj = JSON.parse(localStorage.getItem("donersDetailsObj")) || {};
    if (Object.keys(donersDetailsObj).length > 0) {
      this.donersDetailsObj.firstName = donersDetailsObj.firstName || "";
      this.donersDetailsObj.lastName = donersDetailsObj.lastName || ""; 
      this.donersDetailsObj.donorsTitle = donersDetailsObj.donorsTitle || ""; 
    }

    this.ceremonyID = JSON.parse(localStorage.getItem("ceremonyID")) || 0; 
   // this.plantingCenter = JSON.parse(localStorage.getItem("plantingCenter")) || 0;

    this.api.ceremonyDetails(this.ceremonyID).subscribe((data: any) => {
      if (data.length > 0) {
        console.log({ data });
        try {
          this.donersDetailsObj.firstName = data[0].firstName;
          this.donersDetailsObj.lastName = data[0].lastName;
          this.donersDetailsObj.donorsTitle = data[0].donorsTitle;
          this.ceremonyTime = data[0].ceremony_time;
          this.ceremonyDate = data[0].ceremony_date;
          this.yaaransName = data[0].forester_name;
          this.donationSum = data[0].donation_sum_dollar;
          this.forestName = data[0].planting_center_eng_name;
          this.confirmationNumber = data[0].reception_number_fin;
        } catch (error) {
          this.errMsg = error;
          this.openModal('error-modal');
        }
      }
    },
      error => {
        console.log({ error })
        this.errMsg = error.message;
        if (error.statusText == "Unknown Error") {
          this.errMsg = 'Sorry, there is some connection problem, please try again';
        }
        this.openModal('error-modal');
      });

      //del 1-7-20 we added it to OpenPlantEvent   
      //this.certificateText()
//create zoom meeting 18-6-20
      console.log(' 22-7-20  --  starting to createZoomMeeting');     
      //localStorage.setItem('zoomJoinUrl', 'https://zoom.us/j/92892793197');
      this.zoomApi.createZoomMeeting().subscribe((data: any) => {
        if (data) {
          if (data.code == 124) {
            this.errMsg = data.message;
            //this.errMsg = 'Sorry, there is some prolbem with Zoom';
            this.openModal('error-modal');
          }
          console.log({ data });
          let joinUrl ='';
          let startUrl = '';
          joinUrl = data.join_url;
          startUrl = data.start_url;
          if (!joinUrl) {
            joinUrl = '';
          }
          localStorage.setItem('zoomJoinUrl', joinUrl);
         // localStorage.setItem('zoomStartUrl', startUrl);

          this.api.zoomMeetingUrl(this.ceremonyID, joinUrl).subscribe((data: any) => {
           // this.spinner.hide();
            console.log({ data });
          },
            error => {
              console.log({ error });
            });
        }
        else {
          console.log('no data in createZoomMeeting');
        }
      },
        error => {
          console.log({ error });
          console.log('failed in createZoomMeeting');
          // this.errMsg = error.message;
          // if (error.statusText == "Unknown Error") {
          //   this.errMsg = 'Sorry, there is some connection problem, please try again';
          // }
          // this.openModal('error-modal');
        });
      
  }

        //del 1-7-20 we added it to OpenPlantEvent   
  // certificateText() {
  //   this.api.certificateText(this.ceremonyID).subscribe((data: any) => {
  //     if (data == 0) {
  //       console.log("theres a probeblem with the certificate");        
  //     }
  //   },
  //     error => {
  //       console.log({ error });
  //       // this.errMsg = error.message;
  //       // if (error.statusText == "Unknown Error") {
  //       //   this.errMsg = 'Sorry, there is some connection problem, please try again';
  //       // }
  //       // this.openModal('error-modal');
  //     });
  // }

  shareViaWhatsapp() {
    window.open("https://api.whatsapp.com/send?text=I'm going to plant a tree in Israel! %0A I'm so excited! %0A You should book your tree planting too %0A https://apis.kkl.org.il/PlantaTreeInIsrael/index.html");
    // window.open("https://api.whatsapp.com/send?text=I'm going to plant a tree in Israel! %0A I'm so excited! %0A You should book your tree planting too %0A https%3A%2F%2Fapis.kkl.org.il%2FPlantaTreeInIsrael%2Findex.html");
  }

  shareViaEmail() {
    //window.open("mailto:whywhyn@gmail.com?subject=Yay, I just donated money. Its fun");
    window.open("mailto:?subject=plant a tree in Israel&body=Hi, %0A I just donated money to plant a tree. You should check this out %0A https://apis.kkl.org.il/PlantaTreeInIsrael/index.html");
  }

  // shareViaFacebook() {
  //   window.open("https://www.facebook.com/sharer.php?u=https%3A%2F%2Fapis.kkl.org.il%2FPlantaTreeInIsrael%2Fhome-page");
  //   //https%3A%2F%2Fapis.kkl.org.il%2FPlantaTreeInIsrael%2Fhome-page
  //   //window.open('whywhyn@gmail.com');

  // }

  openModal(id: string) {
    this.modalService.open(id);
    console.log("openModal id: " + id)
  }

  closeModal(id: string) {
    this.modalService.close(id);
    console.log("closeModal id: " + id)
  }
}
