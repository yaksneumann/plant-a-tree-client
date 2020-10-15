import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from '../services/modal.service';

import { NgForm } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AvailableDate } from '../models/availableDates.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css']
})
export class DonationDetailsComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private modalService: ModalService, private spinner: NgxSpinnerService) { }

  choseCaps = false;
  amountOfTrees: number;
  amountOfCaps: number;
  treePrice: number;
  capPrice: number;
  totalSum: number;
  pressedCap: boolean = false;
  ceremonyID: number;
  treeSum: number = 0;
  capSum: number = 0;
  errMsg: string = '';
  amountOfBoxes: number;
  choseBox = false;
  boxSum: number = 0;
  countryName: string;

  availableDates: Array<AvailableDate>;
  minDate: NgbDate;
  maxDate: NgbDate;
  dateId: any = '';
  israelAvailableTime: Array<any> = [];
  localAvailableTime: Array<any> = [];
  localTime: any;
  israelTime: any;
  invalidDate: boolean = false;
  invalidTime: boolean = false;
  itemAvailTime: any;
  DateVal: any;
  personalCertificate: boolean;
  //cirtificate = false;
  id: string;
  radioId: string;
  headingCss = {
    opacity: '0.7'
  };
  bodycss = {
    height: '120vh'
  };
  disableds: string = "true";
  quest1: number = 0;
  quest2: number = 1;
  LocalDate: string;
  LocalTime: string;
  Radionbut: string = "./assets/img/EmtyRadion.svg";
  RadionbutYes: string = "./assets/img/EmtyRadion.svg";
  RadionbutNo: string = "./assets/img/FullRadion.svg";
  acceptEmail: number = 0;
  certificateText: string;

  ngOnInit() {

    window.scroll(0, 0);
    this.amountOfTrees = JSON.parse(localStorage.getItem("amountOfTrees")) || 0;
    this.countryName = JSON.parse(localStorage.getItem("countryName")) || '';

    this.itemAvailTime = new Date(localStorage.getItem("DateVal")).getTime();

    this.certificateText = (localStorage.getItem("certificateText")) || '';

    this.personalCertificate = JSON.parse(localStorage.getItem("personalCertificate")) || false;
    //  if (this.personalCertificate) {
    //   this.cirtificate = true;
    // }

    this.LocalDate = localStorage.getItem("LocalDate") || "";
    this.LocalTime = localStorage.getItem("LocalTime") || "";

    this.amountOfCaps = JSON.parse(localStorage.getItem("amountOfCaps")) || 0;
    this.treePrice = JSON.parse(localStorage.getItem("treePrice")) || 18;
    this.capPrice = JSON.parse(localStorage.getItem("capPrice")) || 6;
    this.amountOfBoxes = JSON.parse(localStorage.getItem("amountOfBoxes")) || 0;
    let donersDetailsObj = JSON.parse(localStorage.getItem("donersDetailsObj")) || {};
    console.log(donersDetailsObj);
    if (Object.keys(donersDetailsObj).length > 0) {
      console.log(this.countryName);
    }

    if (this.amountOfCaps > 0) {
      this.choseCaps = true;
    }
    if (this.amountOfBoxes > 0) {
      this.choseBox = true;
    }

    this.treeSum = this.amountOfTrees * this.treePrice;
    this.capSum = this.amountOfCaps * this.capPrice;
    this.boxSum = this.amountOfBoxes * 10;

    this.calculateSum(this.treeSum, this.capSum, this.boxSum);

    localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
    document.body.classList.add('bodycss');
  }

  // Yes No Func
  onAcceptEmail(acceptEmail: number) {
    this.acceptEmail = acceptEmail;
    if (acceptEmail == 1) {
      this.RadionbutYes = "./assets/img/FullRadion.svg";
      this.RadionbutNo = "./assets/img/EmtyRadion.svg";
    }
    else {
      this.RadionbutYes = "./assets/img/EmtyRadion.svg";
      this.RadionbutNo = "./assets/img/FullRadion.svg";
    }
  }

  // Submit func
  Submmitbut() {
    this.Radionbut = "./assets/img/FullRadion.svg";
    this.quest1 = 1;

    this.headingCss = {
      opacity: '1'
    };
    this.disableds = "";
  }

  calculateSum(trees: number, caps: number, boxes: number) {
    console.log("calculate totalSum");
    this.totalSum = trees + caps + boxes;
  }

  onPayNow() {
    if ( this.disableds != "") {
      alert('please confirm')
      return false;
    }
    localStorage.setItem("totalSum", JSON.stringify(this.totalSum));
    this.spinner.show();
    this.api.OpenPlantEvent(this.acceptEmail).subscribe((data: any) => {
      this.spinner.hide();
      if (data) {
        console.log({ data });
        this.ceremonyID = data[0].CeremonyID;

        if (data[0].CeremonyID < 1) {
          this.errMsg = data.RetErr;
          this.openModal('error-modal');
          return false;
        }
        localStorage.setItem("ceremonyID", JSON.stringify(this.ceremonyID));

        // yaks testing to fix because of delay to api 29-9-20
        this.getUrlFunc();
        ////new 5-3-2020
        //this.updateItems(this.ceremonyID);
      }
    },
      error => {
        this.spinner.hide();
        console.log({ error })
        this.errMsg = error.message;
        if (error.statusText == "Unknown Error") {
          this.errMsg = 'Sorry, there is some connection problem, please try again';
        }
        this.openModal('error-modal');
      });
  }
  viewCertificatePdf() {
    this.openModal('certificate-modal2');
  }

  updateItems(ceremonyID: number) {
    this.spinner.show();
    this.api.insertItems(ceremonyID).subscribe((data: any) => {
      this.spinner.hide();
      this.getUrlFunc();
      console.log({ data });
      if (data == "") {
        console.log('data successful ');
      }
    },
      error => {
        this.spinner.hide();
        console.log({ error })
        this.errMsg = error.message;
        if (error.statusText == "Unknown Error") {
          this.errMsg = 'Sorry, there is some connection problem, please try again';
        }
        this.openModal('error-modal');
      });
  }

  getUrlFunc() {
    this.spinner.show();
    this.api.GetUrlForSlika(this.ceremonyID).subscribe((data: any) => {
      this.spinner.hide();
      if (data[0].RetCode == 'ok') {
        document.body.classList.remove('bodycss');
        console.log({ data });
        window.open(data[0].UrlPage, '_self');
        //this.router.navigate(['payment-page']);
      } else {
        this.errMsg = data[0].UrlPage;
        this.openModal('error-modal');
      }
    },
      error => {
        this.spinner.hide();
        console.log({ error })
        this.errMsg = error.message;
        if (error.statusText == "Unknown Error") {
          this.errMsg = 'Sorry, there is some connection problem, please try again';
        }
        this.openModal('error-modal');
      });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
