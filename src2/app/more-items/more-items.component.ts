import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-more-items',
  templateUrl: './more-items.component.html',
  styleUrls: ['./more-items.component.css']
})
export class MoreItemsComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }
  capNo: number = 1088;
  pressedCap: boolean = false;
  amountOfCaps: number = 0;
  capSum: number = 0;
  capPrice: number = 6;
  pressedBox: boolean = false;
  amountOfBoxes: number = 0;
  boxSum: number = 0;
  boxPrice: number = 10;

  //pressedOnce: boolean = false;

  ngOnInit() {
    this.api.getItemPrice(this.capNo).subscribe((price: number) => {
      if (price) {
        console.log({ price });
        this.capPrice = price;
        localStorage.setItem("capPrice", JSON.stringify(price));
      }
      // else {
      //   console.log('no data in capPrice');
      // }
    },
      error => {
        console.log({ error })
      });
    this.amountOfBoxes = JSON.parse(localStorage.getItem("amountOfBoxes")) || 0;
    this.amountOfCaps = JSON.parse(localStorage.getItem("amountOfCaps")) || 0;
  }


  onPlusBtn(item: string) {
    console.log(item);
    if (item == 'cap') {
      this.amountOfCaps = this.amountOfCaps + 1;
      this.calculateSum(this.amountOfCaps, 'cap');
    }
    else {
      this.amountOfBoxes = this.amountOfBoxes + 1;
      this.calculateSum(this.amountOfBoxes, 'box');
    }
  }

  onMinusBtn(item: string) {
    console.log("onMinusBtn: ");
    if (item == 'cap') {
      if (this.amountOfCaps > 0) {
        this.amountOfCaps = this.amountOfCaps - 1;
        this.calculateSum(this.amountOfCaps, 'cap');
      }
    }
    else {
      if (this.amountOfBoxes > 0) {
        this.amountOfBoxes = this.amountOfBoxes - 1;
        this.calculateSum(this.amountOfBoxes, 'box');
      }
    }

  }

  onEnlargeImg(item: string) {
    console.log("onEnlargeImg; item: " + item);

    if (item == 'cap') {
      this.pressedCap = true;
      // if (this.amountOfCaps == 0) {
      //   //this.pressedOnce = true;
      //   this.amountOfCaps = 1;
      // }
      this.calculateSum(this.amountOfCaps, 'cap');
    } else {
      this.pressedBox = true;
      // if (this.amountOfBoxes == 0) {
      //   //this.pressedOnce = true;
      //   this.amountOfBoxes = 1;
      // }
      this.calculateSum(this.amountOfBoxes, 'box');
    }

  }

  onReduceImg(item: string) {
    // console.log("oReduceImg; ");
    if (item == 'cap') {
      this.pressedCap = false;
      // if (this.amountOfCaps == 1) {
      //   this.amountOfCaps = 0;
      // }
    } else {
      this.pressedBox = false;
    }


  }

  // onChangeAmount(amount: number, item: string) {
  //   console.log("onChangeAmount: " + amount);
  //   amount = Number(amount);
  //   if (amount > -1) {
  //     this.calculateSum(amount, item);
  //   }
  // }

  calculateSum(amount: number, item: string) {
    amount = Number(amount);
    if (amount < 0 ) {
      return false;
    }
    if (isNaN(amount)) {
      // fix - -- add alert mssg
      return false;

    }
    console.log("calculateSum: " + amount);
    if (item == 'cap') {
      this.amountOfCaps = amount;
      this.capSum = this.capPrice * amount;
    } else {
      this.amountOfBoxes = amount;
      this.boxSum = this.boxPrice * amount;
    }
  }
  onBack() {
    this.pressedCap = false;
    this.pressedBox = false;
  }

  onNext() {
    localStorage.setItem("amountOfCaps", JSON.stringify(this.amountOfCaps));
    localStorage.setItem("amountOfBoxes", JSON.stringify(this.amountOfBoxes));

    this.router.navigate(['donation-details']);
  }
}

