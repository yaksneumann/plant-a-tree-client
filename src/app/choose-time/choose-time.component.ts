import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AvailableDate } from '../models/availableDates.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-choose-time',
  templateUrl: './choose-time.component.html',
  styleUrls: ['./choose-time.component.css']
})
export class ChooseTimeComponent implements OnInit {

  constructor(private api: ApiService, private router: Router,
    private modalService: ModalService, private spinner: NgxSpinnerService) { }
  adultNum: number = 1;
  childrenNum: number;
  timeId: number;
  dateId: any = '';
  invalidDate: boolean = false;
  invalidTime: boolean = false;
  invalidPpl: boolean = false;
  errMsg: string = '';
  availableDates: Array<AvailableDate>;
  minDate: NgbDate;
  maxDate: NgbDate;
 //  localAvailableTime: Array<Object> = new Array();
  israelAvailableTime: Array<any> = [];
  localAvailableTime: Array<any> = [];
  localTime: any;
  israelTime: any;
  localZone: string;

  ngOnInit() {
    this.localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.spinner.show();
    this.api.getAllDates().subscribe((availableDates: Array<AvailableDate>) => {
      this.spinner.hide();
      if (availableDates) {
        this.availableDates = availableDates;
        this.minDate = this.availableDates[0].date;
        this.maxDate = this.availableDates[this.availableDates.length - 1].date;
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
        console.log({ price });
        //this.treePrice = price;
        localStorage.setItem("treePrice", JSON.stringify(price));
      }
    },
      error => {
        console.log({ error });
      });
  }

  // *************************************      OF NGB CALANDER    *************************************
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
   this.localAvailableTime = [];
   this.israelAvailableTime = [];

    this.invalidDate = false;
    //console.log({ event });
    datePicker.close();
    this.spinner.show();
    this.api.GetAvailableTimes('', datePicker._inputValue).subscribe((availableTime: Array<Date>) => {
      this.spinner.hide();
      if (availableTime) {
        // this.localAvailableTime = availableTime;
        console.log(availableTime);
        this.israelAvailableTime = availableTime;
        //let localDate: any = [];
        // availableTime.forEach((item: any, index) => {
          availableTime.forEach((item: any) => {
          //date = new Date(item.AvailTime);
          //  console.log({ item });
          try {
            // item.AvailTime = item.AvailTime.replace('T', ' ');
           //  this.localAvailableTime.push({ "AvailTime": new Date(item.AvailTime + ' GMT+3') });
             
             this.localAvailableTime.push({ "AvailTime": new Date(item.AvailTime + '+03:00') });
             
          } catch (error) {
            console.log(error)
          }
          //  item.AvailTime = item.AvailTime + ' GMT+0300';
          //  localDate = new Date(item.AvailTime);
          // localDate = new Date(item.AvailTime + ' GMT+3');
          // this.localAvailableTime.push({"AvailTime": date});
          //  this.localAvailableTime.push({"AvailTime": item.AvailTime});
        });

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

    //yak del 31-5-20 -- seems extra, since we only show him dates that are available
    this.api.GetIsAvailableDate(datePicker._inputValue).subscribe((data: any) => {
      if (data) {
        console.log({ data });
        if (data[0].rc < 0) {
          //this.errMsg = 'sorry this is not an available date, its ' + data[0].HebHoilday;
          this.errMsg = 'sorry this date is not available';
          this.openModal('error-modal');
          return false;
        }
      }
    },
      error => {
        console.log({ error })
      });
  }
  // onTimeChange(time: any) {
  onTimeChange(index: any) {
    this.invalidTime = false;
    console.log('onTimeChange time: ' + index);

    //for zoom
    index = index.split(':')[0];
    // let israelTime = this.israelavailableTime[index].AvailTime;
    this.localTime = this.localAvailableTime[index].AvailTime;
    this.israelTime = this.israelAvailableTime[index].AvailTime;

    console.log('israel Time: ' + this.israelTime);
    console.log('localTime: ' + this.localTime);

    ////check if user in israel
    //if (this.localTime.getTimezoneOffset() != -180) {
    //this.errMsg = 'Be aware that at your local time the time would be: ' + this.localTime;
    this.openModal('date-modal');
    // }
  }
  // closeFix(event, datePicker) {
  //   if (event.target.offsetParent == null)
  //     datePicker.close();
  //   else if (event.target.offsetParent.nodeName != "NGB-DATEPICKER")
  //     datePicker.close();
  // }

  onSubmit(form: NgForm) {
    console.log(form);
    let date = form.value.date || '';
    let ceremonyDateAndHour = this.israelTime;
    //let ceremonyDateAndHour = form.value.time || '';
    // let numberOfAdults = form.value.numberOfAdults || 0;
    let numberOfAdults = 1;
    let numberOfChildren = form.value.numberOfChildren || 0;

    if (date == '') {
      this.invalidDate = true;
      this.errMsg = 'Please choose a valid date';
      this.openModal('error-modal');
      return false;
    }

    if (ceremonyDateAndHour == '') {
      this.invalidTime = true;
      this.errMsg = 'Please choose a valid time';
      this.openModal('error-modal');
      return false;
    }

    if (numberOfAdults < 1) {
      this.errMsg = 'At least one adult must be chosen';
      this.openModal('error-modal');
      this.invalidPpl = true;
      return false;
    }

    if (numberOfChildren < 0) {
      this.errMsg = 'Please choose a positive number of children';
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
      console.log(numberOfPeople);
      this.router.navigate(['choose-plants']);
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
