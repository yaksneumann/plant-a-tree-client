import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-donors-details',
  templateUrl: './donors-details.component.html',
  styleUrls: ['./donors-details.component.css']
})
export class DonorsDetailsComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private modalService: ModalService) { }
  totalAmount: number = 0;
  invalidEmail: boolean = false;
  invalidPhone: boolean = false;
  invalidLastName: boolean = false;
  invalidFirstName: boolean = false;
  invalidCountry: boolean = false;
  countryId: number = null;
  countryName: string;
  countries: Array<any>;
  title: Array<any>;
  email: string = '';
  titleId: number = null;
  //donorsTitle: number;
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  errMsg: string = '';
  localPhone: string = '';

  ngOnInit() {
    window.scroll(0,0);
    let donersDetailsObj = JSON.parse(localStorage.getItem("donersDetailsObj")) || {};
    if (Object.keys(donersDetailsObj).length > 0) {
      this.firstName = donersDetailsObj.firstName;
      this.lastName = donersDetailsObj.lastName;
      this.phone = donersDetailsObj.phone;
      this.email = donersDetailsObj.email;
      this.titleId = donersDetailsObj.donorsTitle;
      this.countryId = donersDetailsObj.countryId;
      this.countryName =  donersDetailsObj.countryName;
    }
    if (this.titleId == 0) {
      this.titleId = null;
    }
    this.api.GetCountries().subscribe((countries: Array<any>) => {
      if (countries) {
        console.log({ countries });
        this.countries = countries;
      }
      else {
        console.log('no data in GetCountries');
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

    this.api.getDonorsTitle().subscribe((titles: Array<any>) => {
      if (titles) {
        console.log({ titles });
        this.title = titles;
      }
      else {
        console.log('no data in titles');
      }
    },
      error => {
        console.log({ error }) 
      });
  }

  onChangeCountry(countryId: any) {
    console.log('countryId: ' + countryId);
    this.invalidCountry = false;
    this.countries.forEach(element => {
   
      if (element.code == countryId){
        console.log(element);
        localStorage.setItem('countryName', JSON.stringify(element.name)); 
      }
    });
  }

  checkValid(field: any) {
    if (field) {
      return field.invalid
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.errMsg = '';
    let donorsTitle = form.value.titleId || 0;
    let firstName = form.value.firstName || '';
    let lastName = form.value.lastName || '';
    let phone = form.value.phone || '';
    let israeliPhone = form.value.localPhone || '';
    let email = form.value.email || '';
    let countryId = form.value.countryId || 0;
    let countryName = form.value.countryName || '';
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    let phoneRegex = /^\d{9,15}$/;

    if (donorsTitle == 'null') {
      donorsTitle = 0;
    }       

    if (firstName == '') {
      this.invalidFirstName = true;
      //$("#firstName").css("border","1px solid red");
       this.errMsg = 'Please fill in your first name';
    }
    if (lastName == '') {
      this.invalidLastName = true;
     // $("#lastName").css("border","1px solid red");
      if (this.errMsg != '') {
        this.errMsg = this.errMsg + ', and your last name'  ;          
      }
      else {
        this.errMsg = 'Please fill in your last name';
      }
    }     

    if (!emailRegex.test(email)) { //regex 
      this.invalidEmail = true;
     // $("#email").css("border","1px solid red");
      if (this.errMsg != '') {
        this.errMsg = this.errMsg + ', and type a valid Email' ;           
      }
      else {
        this.errMsg = 'Please type a valid Email';
      }    
    }

    if (!phoneRegex.test(phone)) {
      this.invalidPhone = true;
     //  $("#phone").css("border","1px solid red");
      if (this.errMsg != '') {
        this.errMsg = this.errMsg + ', and type a phone number at least 9 digits and not more then 15 digits'   ;         
      }
      else {
        this.errMsg = 'Please type a phone number at least 9 digits and not more then 15 digits';
      }
    }

    if (countryId == '' || countryId == null || countryId == 'null') {
      this.invalidCountry = true;
       $("#countries").css("border","1px solid red");
      if (this.errMsg != '') {
        this.errMsg = this.errMsg + ', and select a country' ;      
      }
      else {
        this.errMsg = 'Please select a country';
      }
       
    }    
    if (this.errMsg != '') {
     //   this.openModal('error-modal');
        return false;
    }

    if (form.valid) {
      let donersDetailsObj = {
        "donorsTitle": donorsTitle,
        "firstName": firstName,
        "lastName": lastName,
        "phone": phone,
        "israeliPhone": israeliPhone,
        "email": email,
        "countryId": countryId,
        "countryName" :countryName
      }
      localStorage.setItem('donersDetailsObj', JSON.stringify(donersDetailsObj));
    

      // for zoom
      // this.router.navigate(['more-items']);
      localStorage.setItem("amountOfCaps", '0');
      localStorage.setItem("amountOfBoxes", '0');
      // this.router.navigate(['donation-details']);
      //24-6-20
      this.router.navigate(['cirtificate']);
      
    }
    else {
      if (this.errMsg != '') {
        this.openModal('error-modal');
      }
      else {
        this.errMsg = 'Please fill out the form';
        this.openModal('error-modal');
      }
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
