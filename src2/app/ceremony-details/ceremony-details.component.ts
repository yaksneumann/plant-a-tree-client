import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { NgxSpinnerService } from "ngx-spinner";
//import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-ceremony-details',
  templateUrl: './ceremony-details.component.html',
  styleUrls: ['./ceremony-details.component.css']
})
export class CeremonyDetailsComponent implements OnInit {
  @ViewChild('textarea', { static: true }) public textarea: ElementRef;
  element: HTMLElement;


  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute,
    private modalService: ModalService, private spinner: NgxSpinnerService) { }
  errMsg: string = '';
  url: any;
  ceremonyID: number = 0;
  plantingCenter: number = 0;

  ceremonyDetails: any = {
    cap: "",
    ceremony_date: "",
    ceremony_name_eng: "",
    ceremony_time: "",
    donation_sum_dollar: 0,
    donorsTitle: "",
    firstName: "",
    forester_mobile: "",
    forester_name: "",
    lastName: "",
    participants_no: 0,
    planting_center_eng_name: "",
    reception_number_fin: 0,
    tree: "",
    JoinUrl: "",
    CertificateText: ""
  }
  editCertificateText: boolean = false;
  //zoomJoinUrl: string = "";
  usingPc: boolean = false;
  plantingPrayer: boolean = false;

  ngOnInit() {
    this.ceremonyDetails.JoinUrl = localStorage.getItem('zoomJoinUrl');
    this.plantingCenter = JSON.parse(localStorage.getItem("plantingCenter"));

    this.spinner.show();
    //let activatedRoute = this.activatedRoute;
    //  this.url = this.activatedRoute.snapshot.queryParams;
    console.log(this.activatedRoute);

    this.ceremonyID = this.activatedRoute.snapshot.queryParams.CeremonyID || 0;
    if (this.ceremonyID == 0) {
      this.ceremonyID = JSON.parse(localStorage.getItem("ceremonyID")) || 0;
    }
    else {
      localStorage.setItem('ceremonyID', JSON.stringify(this.ceremonyID));
    }

    this.api.ceremonyDetails(this.ceremonyID).subscribe((data: any) => {
      this.spinner.hide();
      if (data.length > 0) {
        console.log({ data });
        this.ceremonyDetails = data[0];
      }
      else {
        this.errMsg = 'Sorry, for ceremony number: ' + this.ceremonyID + ', no information found';
        this.openModal('error-modal');
      }
    },
      error => {
        this.spinner.hide();
        this.errMsg = 'Sorry, there has been a conection problem. Please try later';
        this.openModal('error-modal');
      });
  }

  sendWhatsapp() {
    //forester_mobile: "0545499468"
    let phone = this.ceremonyDetails.forester_mobile;
    phone = phone.slice(1, 10);
    window.open('whatsapp://send?phone=+972' + this.ceremonyDetails.forester_mobile + '&text=Shalom ' + this.ceremonyDetails.forester_name + ',%0AThis is ' + this.ceremonyDetails.firstName + " " + this.ceremonyDetails.lastName + '%0AWe are looking foward seeing you at the tree planting on ' + this.ceremonyDetails.ceremony_date + ' at: ' + this.ceremonyDetails.ceremony_time + '.%0A*Have a nice day!*');
  }

  sendSms() {
    let phone = this.ceremonyDetails.forester_mobile;
    phone = phone.slice(1, 10);
    window.open('sms:+972' + this.ceremonyDetails.forester_mobile + '?body=Shalom ' + this.ceremonyDetails.forester_name + ',%0AThis is ' + this.ceremonyDetails.firstName + " " + this.ceremonyDetails.lastName + '%0AWe are looking foward seeing you at the tree planting on ' + this.ceremonyDetails.ceremony_date + ' at: ' + this.ceremonyDetails.ceremony_time + '.%0AHave a nice day!');
  }

  callForester() {
    let phone = this.ceremonyDetails.forester_mobile;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // mobile!
      phone = phone.slice(1, 10);
      window.open('tel:+972' + phone);
    }
    else {
      //this.usingPc = true;
      this.errMsg = phone;
      this.openModal('error-modal');
    }
  }

  sendEmail() {
    window.open('mailto:tovad@kkl.org.il?subject=Tree planting ceremony number: ' + this.ceremonyID + '&body=Hi Tova,%0A I would like to make some changes to my planting a tree event%0A');
  }
  callOffice() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // mobile!
      window.open('tel:+97226583384');
    }
    else {
      //this.usingPc = true;
      this.errMsg = '02-658-3384';
      this.openModal('error-modal');
    }
  }
  // openInstagram() {
  //   window.open("https://www.instagram.com/kkl_jnf/");
  // }

  openWaze() {
    if (this.plantingCenter == 11) {
      // 11-2-2020   -->   new location    <--
      window.open("waze://?ll=32.781689,35.421497&navigate=yes");
      //window.open("waze://?ll=32.78844,35.43770&navigate=yes");
      //https://www.waze.com/he/livemap/directions?latlng=32.780521%2C35.432475
    }
    else {
      window.open("waze://?ll=31.78794,34.99377&navigate=yes");
    }
  }

  openGooglemaps() {
    if (this.plantingCenter == 11) {
      // 13-2-2020   -->   new location    <--
      window.open("https://www.google.com/maps/search/32.781689,+35.421497");
      //  window.open("https://www.google.com/maps/search/32.780594,+35.432407");     
      // https://www.google.com/maps/place/32%C2%B046'49.9%22N+35%C2%B025'56.9%22E/@32.780521,35.4302863,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d32.780521!4d35.432475
      // window.open("http://maps.google.com/maps?q=Plant+a+Tree+–+Lavi+Forest");
    }
    else {
      window.open("http://maps.google.com/maps?q=Plant+a+Tree+–+Tzora+Forest");
    }
  }

  openZoom() {
   if (this.ceremonyDetails.JoinUrl == '' || !this.ceremonyDetails.JoinUrl || this.ceremonyDetails.JoinUrl == null) {
    this.ceremonyDetails.JoinUrl = localStorage.getItem('zoomJoinUrl'); 
   }
      window.open(this.ceremonyDetails.JoinUrl);
      //this.zoomJoinUrl = 'https://zoom.us/j/92892793197';
  }

  viewCertificateImg() {
    this.openModal('certificate-modal');
  }

  editCertificate() {
    this.editCertificateText = true;
    //(<HTMLInputElement>document.getElementById("textarea")).focus();
    //globalThis.document.getElementById('textarea').focus();
   // parent.document.getElementById("textarea").focus();

    // this.element = document.getElementById('certificateText') as HTMLElement;
    // this.element.focus();

    // console.log(this.textarea.nativeElement.innerHTML);
    // this.textarea.nativeElement.focus();
    //window.parent.document.getElementById("certificateText").focus();
  }

  confirmCertificate() {
    localStorage.setItem("certificateText", this.ceremonyDetails.CertificateText);
    this.spinner.show();
    this.api.updateCertificate(this.ceremonyID, this.ceremonyDetails.CertificateText).subscribe((data: any) => {
      this.spinner.hide();
      if (data > 0) {
        console.log({ data });
      }
      else {
        this.errMsg = 'Sorry, there has beem some error';
        this.openModal('error-modal');
      }
    },
      error => {
        this.spinner.hide();
        this.errMsg = 'Sorry, there has been a conection problem. Please try later';
        this.openModal('error-modal');
      });    
      
    this.closeModal('certificate-modal');
  }

  onPlantingPrayer() {
    this.openModal('prayer-modal');

this.plantingPrayer = true
    //window.open("./assets/img/planting-prayer.pdf");
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.editCertificateText = false;
    this.modalService.close(id);
  }
}