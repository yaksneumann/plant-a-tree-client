import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { NgxSpinnerService } from "ngx-spinner";
//import { DOCUMENT } from '@angular/common'; 
 
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

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
  usingPc: boolean = false;
  plantingPrayer: boolean = false;
  
  ngOnInit() {
    $(".navbar").hide();
    window.scroll(0,0);
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
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.editCertificateText = false;
    this.modalService.close(id);
  }
}
