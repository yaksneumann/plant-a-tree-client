import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from '../services/modal.service';


@Component({
  selector: 'app-cirtificate',
  templateUrl: './cirtificate.component.html',
  styleUrls: ['./cirtificate.component.css']
})
export class CirtificateComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private modalService: ModalService) { }
  alert: string="test";
  errMsg: string = '';
  certificateText: string = '';
  counttext: number=0;
  donersDetails: any = { 
    firstName: "",
    lastName: ""
  }
  titleDesc: string = '';
  pdfSrc: any = '';
  pdfOpen: boolean = false;
  nocirtificate: string ;
  public CertivicDiv = false;
 
  ngOnInit() { 
    window.scroll(0,0);
    let donersDetailsObj = JSON.parse(localStorage.getItem("donersDetailsObj")) || {};
    if (Object.keys(donersDetailsObj).length > 0) {
      this.donersDetails.firstName = donersDetailsObj.firstName;
      this.donersDetails.lastName = donersDetailsObj.lastName;
      this.donersDetails.titleId = donersDetailsObj.donorsTitle;

      switch (this.donersDetails.titleId) {
        case 1:
          this.titleDesc = "Mr. ";
          break;
        case 2:
          this.titleDesc = "Mrs. ";
          break;
        case 11:
          this.titleDesc = "Ms. ";
          break;
        case 36:
          this.titleDesc = "Miss ";
          break;
        case 69:
          this.titleDesc = "Mrs. & Mrs. ";
          break;
        default:
          this.titleDesc = "";
      }
    }
    let amountOfTrees = JSON.parse(localStorage.getItem("amountOfTrees") || '1');
    if (amountOfTrees > 1) {
      this.certificateText = this.titleDesc + this.donersDetails.firstName + ' ' + this.donersDetails.lastName + ' has planted ' + amountOfTrees + ' trees in the Tzora forest at the foothills of Jerusalem. ';
     }
    else {
      this.certificateText = this.titleDesc + this.donersDetails.firstName + ' ' + this.donersDetails.lastName + ' has planted a tree in the Tzora forest at the foothills of Jerusalem. ';
    }

    localStorage.setItem('certificateText', JSON.stringify(this.certificateText)); 

    //document.getElementById("certificateText").focus();
      document.getElementById("menubuttons").focus();

     this.counttext = (this.certificateText).length; 
  }
  ngAfterViewInit() {
    this.openModal('certificate-modal');
  }

  viewCertificatePdf() {  
 this.openModal('certificate-modal2');
    //window.open("./assets/img/certificate-merged.pdf", "_blank");
  }

  onTextChange(){
    this.counttext = (this.certificateText).length;
  }

  viewCertificateImg() {
    this.openModal('certificate-modal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  CertifYes(id: string, sure: string) {
    console.log("CertifYes");
    this.nocirtificate = "false";
     this.CertivicDiv=true;
    localStorage.setItem("nocirtificate",  this.nocirtificate);  
    this.modalService.close(id);
  }

  CertifWant(id: string, sure: string) {
    console.log("test");
    this.nocirtificate = "true";
    localStorage.setItem("nocirtificate",  this.nocirtificate); 
    this.certificateText = "";
    this.counttext=0;
    this.router.navigate(['donation-details']);
    this.modalService.close(id);
  }
  closeModal(id: string, sure: string){
    this.modalService.close(id);
  }

  
  onSkipBtn() {
    if (this.certificateText == '') {
      this.errMsg = 'are you sure that you want to recieve a general certificate?';
      this.openModal('error-modal');
    } 
  }


  onNextBtn() { 
      localStorage.setItem("certificateText", this.certificateText); 
      this.router.navigate(['donation-details']);
  }

}
