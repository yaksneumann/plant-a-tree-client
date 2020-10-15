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
  //yaaransPhone: string = '';
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
  joinUrl: string = '';
  startUrl: string = '';
  certificateText: string = '';

  

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
          this.joinUrl = data[0].JoinUrl;
          this.certificateText = data[0].CertificateText;

          if (this.joinUrl == '') {
            this.createZoom();
          }
          
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
      
      

  }

  createZoom() {
  
    console.log(' 30-9-20  --  starting to createZoomMeeting');
    this.zoomApi.createZoomMeeting().subscribe((data: any) => {
      console.log({ data });
      if (data) {
        if (data.code == 124) {
          this.errMsg = data.message;
          //this.errMsg = 'Sorry, there is some prolbem with Zoom';
          this.openModal('error-modal');
        }     
        this.joinUrl = data.join_url;
        this.startUrl = data.start_url;
        localStorage.setItem('zoomJoinUrl', this.joinUrl);
        localStorage.setItem('zoomStartUrl', this.startUrl);

        this.api.zoomMeetingUrl(this.ceremonyID, this.joinUrl).subscribe((data: any) => {
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
    window.open("https://api.whatsapp.com/send?text=I'm going to plant a tree in Israel! %0AI'm so excited! %0AYou should book your tree planting too %0Ahttps://plantATree.kkl.org.il/");
  }

  shareViaTwit() {
    window.open("https://twitter.com/intent/tweet?url=https://plantATree.kkl.org.il/&text=Plant A Tree In Israel KKL -- JNF");
  }

  shareViaEmail() {
    window.open("mailto:?subject=plant a tree in Israel&body=Hi, %0AI'm going to plant a tree in Israel!. %0AYou should check this out %0Ahttps://plantATree.kkl.org.il/");
  }

  shareViaFacebook() {
    window.open("https://www.facebook.com/sharer.php?u=https://plantATree.kkl.org.il/");
  }
  sendEmail() {
    window.open('mailto:tovad@kkl.org.il?subject=Tree planting ceremony number: ' + this.ceremonyID + '&body=Hi Tova,%0AI would like to make some changes to my planting a tree event%0A');
  }
  openModal(id: string) {
    this.modalService.open(id);
    console.log("openModal id: " + id)
  }

  closeModal(id: string) {
    this.modalService.close(id);
    console.log("closeModal id: " + id)
  }
}