import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from '../services/modal.service';

import { NgForm } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AvailableDate } from '../models/availableDates.model';
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from 'jquery';

@Component({
  selector: 'app-choose-orderplants',
  templateUrl: './choose-orderplants.component.html',
  styleUrls: ['./choose-orderplants.component.css']
})
export class ChooseOrderPlantsComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private modalService: ModalService, private spinner: NgxSpinnerService) { }

  errMsg: string = '';
  chooseGolani: boolean = false;
  chooseTzora: boolean = true;
  plantingCenter: any = 35;
  amountOfTrees: number = 1;
  totalAmount: number = 18;
  treePrice: number = 18;
  //anotherNumber: boolean = false;
  // adultNum: number = 1;
  // childrenNum: number;
  time: any = null;
  dateId: any;
  date: string = '';
  invalidDate: boolean = false;
  invalidTime: boolean = false;
  invalidPpl: boolean = false;
  availableDates: Array<AvailableDate>;
  minDate: NgbDate;
  maxDate: NgbDate;
  israelAvailableTime: Array<any> = [];
  localAvailableTime: Array<any> = [];
  localTime: any;
  israelTime: any;
  israelDate: any;
  localZone: string;
  TreeCounter: number = 1;
  LocalDate: string = '';
  LocalTime: string = '';
  LocalDatediv: boolean = false;
  screenHeight: any;

  ngOnInit() {
    window.scroll(0, 0);
    $(".kkl-icon1").css("width", "45%");
    $(".kkl-icon2").css("width", "30%");
    localStorage.setItem("plantingCenter", '35');
    //ysks show time if went back
    this.localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.spinner.show();
    this.api.getAllDates().subscribe((availableDates: Array<AvailableDate>) => {
      this.spinner.hide();
      if (availableDates) {
        this.availableDates = availableDates;
        this.minDate = this.availableDates[0].date;
        this.maxDate = this.availableDates[this.availableDates.length - 1].date;
        //this.dateId = '5'
      }
    },
      error => {
        this.spinner.hide();
        console.log({ error });
        this.errMsg = error.message;
        if (error.statusText == "Unknown Error") {
          this.errMsg = 'Sorry, there is some connection problem, please try again';
        }
        this.openModal('error-modal');
      });

    localStorage.setItem("treePrice", JSON.stringify(18));
    this.api.getItemPrice(1065).subscribe((price: number) => {
      if (price) {
        //console.log({ price });
        localStorage.setItem("treePrice", JSON.stringify(price));
      }
    },
      error => {
        console.log({ error });
      });
    let dateVal;
    this.LocalDate = JSON.parse(localStorage.getItem("LocalDate")) || "";
    this.LocalTime = JSON.parse(localStorage.getItem("LocalTime")) || "";
//    this.israelDate = new Date(JSON.parse(localStorage.getItem("israelDate"))).getDate() || "";

    if (this.LocalDate != "" && this.LocalTime != "") {
      this.LocalDatediv = true;
      dateVal = localStorage.getItem("DateVal");
      console.log("dateVal: " + dateVal);

      this.dateId = dateVal;
      //document.getElementById("date").innerHTML = devals;

      this.api.GetAvailableTimes('', dateVal).subscribe((availableTime: Array<Date>) => {
        this.spinner.hide();
        if (availableTime) {
          //var count = 0;
          this.israelAvailableTime = availableTime;
          availableTime.forEach((item: any) => {
            let itemAvailTime = new Date(item.AvailTime).getTime();
            try {
              this.localAvailableTime.push({ "AvailTime": new Date(item.AvailTime + '+03:00') });
            } catch (error) {
              console.log(error);
            }
          });
        }
      },
        error => {
          this.spinner.hide();

          this.errMsg = error.message;
          if (error.statusText == "Unknown Error") {
            this.errMsg = 'Sorry, there is some connection problem, please try again';
          }
          console.log("Error GetAvailableTimes " + { error });
          this.openModal('error-modal');
        });
    }
  }

  onPlusBtn() {
    this.amountOfTrees = this.amountOfTrees + 1;
    //this.anotherNumber = true;
    this.calculateAmount(this.amountOfTrees);
  }

  onMinusBtn() {
    // this.anotherNumber = true;
    if (this.amountOfTrees > 1) {
      this.amountOfTrees = this.amountOfTrees - 1;
      this.calculateAmount(this.amountOfTrees);
    }
  }

  calculateAmount(num: any) {
    console.log("calculateAmount btn; num: " + num);
    this.totalAmount = this.treePrice * num;
  }

  onChangeNumber(amount: number) {
    amount = Number(amount);
    console.log("onChangeNumber: " + amount);
    if (amount == null || amount == 0 || amount == NaN) {
      this.amountOfTrees = 1;
    }
    else {
      this.amountOfTrees = amount;
    }
    this.calculateAmount(this.amountOfTrees);
  }

  isDisabled = (date: NgbDate, current: { month: number }) => {
    let bingo = false;
    if (this.availableDates && this.availableDates.length > 0) {

      this.availableDates.forEach(item => {
        if (!item.isAvailable && item.date.day === date.day && item.date.month === date.month && item.date.year === date.year) {
          bingo = true;
          return;
        }
      });
    }
    return bingo;
  }
  // *************************************     END OF NGB CALANDER    *************************************

  onDateChange(event: any, datePicker: any) {
    this.LocalDatediv = false;
    this.localAvailableTime = [];
    this.israelAvailableTime = [];
    this.invalidDate = false;
    datePicker.close();
    console.log({ event });
    console.log({ datePicker });
    this.checkDate();
    localStorage.setItem("DateVal", datePicker._inputValue);
    this.spinner.show();
    this.api.GetAvailableTimes('', datePicker._inputValue).subscribe((availableTime: Array<Date>) => {
      this.spinner.hide();
      if (availableTime) {
        //var count = 0;
        this.israelAvailableTime = availableTime;
        availableTime.forEach((item: any) => {
          let itemAvailTime = new Date(item.AvailTime).getTime();
          try {
            this.localAvailableTime.push({ "AvailTime": new Date(item.AvailTime + '+03:00') });
          } catch (error) {
            console.log(error);
          }
        });
      }
    },
      error => {
        this.spinner.hide();

        this.errMsg = error.message;
        if (error.statusText == "Unknown Error") {
          this.errMsg = 'Sorry, there is some connection problem, please try again';
        }
        console.log("Error GetAvailableTimes " + { error });
        this.openModal('error-modal');
      });

    //yak del 31-5-20 -- seems extra, since we only show him dates that are available
    this.api.GetIsAvailableDate(datePicker._inputValue).subscribe((data: any) => {
      if (data) {
        console.log("Data GetAvailableDate: " + { data });
        

        if (data[0].rc < 0) {
          this.errMsg = 'sorry this date is not available';
          console.log("Error GetAvailableDate: " + this.errMsg);
          this.openModal('error-modal');
          return false;
        }
      }
    },
      error => {
        console.log("Error GetAvailableDate2 " + { error })
      });
  }

  checkDate() {
    let changetDateLayout = new Date(this.dateId.year, this.dateId.month - 1, this.dateId.day);
    var options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    let Datearray = changetDateLayout.toLocaleDateString("en-US", options).replace(',', '').split(" ");
    console.log("kyky: " + Datearray[1] + " " + Datearray[0] + " " + Datearray[2]);
    $("#date").val(Datearray[1] + " " + Datearray[0] + " " + Datearray[2].replace(',', ''));
  }

  // onTimeChange(time: any) {
  onTimeChange(index: any, time: any) {
    this.invalidTime = false;

    index = index.split(':')[0];
    index--;

    this.localTime = this.localAvailableTime[index].AvailTime;
    this.israelTime = this.israelAvailableTime[index].AvailTime;


    localStorage.setItem('localTime', JSON.stringify(this.localTime)); // User Local Date Time
    localStorage.setItem('israelTime', JSON.stringify(this.israelTime));
    this.changeviewLocalDate();

  }

  changeviewLocalDate() {  // Show Local Date and Time of donor
    let localTimes = JSON.parse(localStorage.getItem("localTime")) || "";
    var options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    let Datearray = (new Date(localTimes)).toLocaleDateString("en-US", options).replace(',', '').split(" ");

    if (Datearray.length == 5) {
      this.LocalDate = Datearray[1] + " " + Datearray[0] + " " + Datearray[2].replace(',', '');
      this.LocalTime = Datearray[3] + " " + Datearray[4];
    }
    else {
      this.LocalDate = Datearray[1] + " " + Datearray[0] + " " + Datearray[2].replace(',', '');
      this.LocalTime = Datearray[3];
    }
    localStorage.setItem('LocalDate', JSON.stringify(this.LocalDate));
    localStorage.setItem('LocalTime', JSON.stringify(this.LocalTime));
    this.LocalDatediv = true;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    let date = form.value.date || '';
    let time = form.value.time || '';
    let ceremonyDateAndHour = this.israelTime;
    let numberOfAdults = 1;
    let numberOfChildren = form.value.numberOfChildren || 0;

    if (date == '') {
      this.invalidDate = true;
      $("#date").css("border", "1px solid red");
      // this.errMsg = 'Please choose a valid date';
      // this.openModal('error-modal');
      return false;
    }

    if (time == '') {
      this.invalidTime = true;
      $("#time").css("border", "1px solid red");
      // this.errMsg = 'Please choose a time';
      // this.openModal('error-modal');
      return false;
    }

    if (ceremonyDateAndHour == '') {
      this.invalidTime = true;
      this.errMsg = 'Please choose a valid time';
      this.openModal('error-modal');
      return false;
    }

    if (form.valid) {
      let numberOfPeople = {
        "numberOfAdults": numberOfAdults,
        "numberOfChildren": numberOfChildren
      }
      localStorage.setItem('ceremonyDateAndHour', ceremonyDateAndHour);
      localStorage.setItem('numberOfPeople', JSON.stringify(numberOfPeople));
      localStorage.setItem("amountOfTrees", JSON.stringify(this.amountOfTrees));
      
      // localStorage.setItem("localAvailableTime", JSON.stringify(this.localAvailableTime));

      console.log(numberOfPeople);
      this.router.navigate(['donors-details']);
    }
    else {

      this.errMsg = 'Invalid form, please fill in';
      this.openModal('error-modal');
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
