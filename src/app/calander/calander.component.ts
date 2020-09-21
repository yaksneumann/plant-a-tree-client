import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { ApiService } from 'src/app/services/api.service';
  import { NgForm } from '@angular/forms';
  import { ModalService } from '../services/modal.service';

  import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
  //import {AvailableDate} from './availableDate';
  import { AvailableDate } from '../models/availableDates.model';

//import { BindingForm } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent implements OnInit {

  adultNum: number;
  childrenNum: number;
  plantingHours: any = [];
  timeId: number;
  dateId: any = '';
  // minDate:any = "";
  // maxDate:any = "2020-8-7";
  invalidDate: boolean = false;
  invalidTime: boolean = false;
  invalidPpl: boolean = false;
  errMsg: string = '';
  //availableDate: any;
  //availableDates: Array<any>;
  availableTime: Array<any>;
  availableDates: Array<AvailableDate>;
  minDate:NgbDate;
  maxDate:NgbDate;
  //nonAvailDates: Array<NgbDate>;

constructor(private api: ApiService, private router: Router, private modalService: ModalService) { }
    ngOnInit() {
      this.api.getAllDates().subscribe((availableDates:Array<AvailableDate>) =>{
          this.availableDates = availableDates;
          this.minDate = this.availableDates[0].date;
          this.maxDate = this.availableDates[this.availableDates.length -1].date;
      })  

  //***************    from yair    ***********************
//   var today = new Date();
//   //this.minDate = new NgbDate(today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate()+1)).slice(-2)));
//   this.minDate = new NgbDate(today.getFullYear(), today.getMonth()+1, today.getDate()+1);

//   //this.minDate = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate());
//    this.maxDate = new NgbDate(today.getFullYear()+1, today.getMonth(), today.getDate());
//  // this.maxDate = new NgbDate(today.getFullYear(), today.getMonth()+6, today.getDate());


  // temp hard coded
  // this.nonAvailDates = new Array<NgbDate>();
  // // you do it with a loop.....
  // // for your sample only two dates....
  // this.nonAvailDates.push(new NgbDate(2019, 12, 10));
  // this.nonAvailDates.push(new NgbDate(2020, 1, 10));

  //***************   END from yair    ***********************


      
      //check if early date
      // let today = new Date();
      // this.minDate = (today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate()+1)).slice(-2));
      // let newDate = new Date(today.setMonth(today.getMonth()+7));
      // this.maxDate = (newDate.getFullYear()+ '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2));
      // //console.log( this.minDate );
  
      // this.api.getAllDates().subscribe((dates: Array<any>) => {
      //   if (dates) {
      //     console.log({ dates });
      //     this.dates = dates;
      //   }
      //   else {
      //     console.log('no data in getalldates');
      //   }
      // },
      //   error => {
      //     console.log({ error })
      //     this.errMsg = error.message;
      //     this.openModal('error-modal');
      //   });
    }
  //***************    from yair    ***********************

    isDisabled = (date: NgbDate, current: {month: number}) => {
     let bingo  = false;
      //this.nonAvailDates.findIndex(p => p.year == date.year && p.month == date.month && p.day == date.day) > 0
      //return (date.day === 10 || date.day === 13);
     if (this.availableDates && this.availableDates.length > 0){
      // let prob:AvailableDate = new AvailableDate();
      // prob.date = date;
      // prob.isAvailable = false;
    
      // let bingo = this.availableDates.find((p) => {
      //   return (p.date == date && p.isAvailable == false);
      // })

      // return ! bingo == undefined
      
 //if (date.day == 23){
      this.availableDates.forEach(item => {
        if (! item.isAvailable && item.date.day === date.day && item.date.month === date.month && item.date.year === date.year){
        //if (! item.isAvailable && item.date == date){

       bingo = true; 
          return;
        }
      });
 //}
    }   
     return bingo;}
  //***************   END from yair    ***********************

  onDateChange(e) {
    console.log({ e } );
  }
    onChangeTime(e) {
      console.log(e);
    }

    onInputChange(date:any){
      console.log(date);
    }

    onInputDate(date: any) {    
      this.api.GetIsAvailableDate(date).subscribe((data: any) => {
        if (data) {
          console.log({ data });
          if (data[0].rc < 0) {
            //this.errMsg = 'sorry this is not an available date, its ' + data[0].HebHoilday;
            this.errMsg = 'sorry this date is not available';
            this.openModal('error-modal');
            return false;
          }
          else {
            // show time after choosing date
            this.api.GetAvailableTimes('', date).subscribe((availableTime: Array<Date>) => {
              if (availableTime) {
                console.log({ availableTime });
                //availableTime[0].tmp_time
                this.plantingHours = availableTime;
              }
            },
              error => {
                console.log({ error });
                // this.errMsg = error.message;
                this.errMsg = error.message;
                this.openModal('error-modal');
              });
          }
          //this.availableDate = data;
        }
      },
        error => {
          console.log({ error })
          this.errMsg = error.message;
          
          this.openModal('error-modal');
        });
  
      // fix may need to check date again
      console.log(date);
  
  
      //this.dateId = date;
    }

  
    openModal(id: string) {
      this.modalService.open(id);
    }
  
    closeModal(id: string) {
      this.modalService.close(id);
    }
  }


  
  
