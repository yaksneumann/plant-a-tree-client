import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-choose-plants',
  templateUrl: './choose-plants.component.html',
  styleUrls: ['./choose-plants.component.css']
})
export class ChoosePlantsComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private modalService: ModalService) { }
  
  amountOfTrees: number;
  totalAmount: number = 0;
  treePrice: number = 18;
  anotherNumber: boolean = false;
  errMsg: string = '';

  //amountOfPeople: any;

  ngOnInit() {
    this.treePrice = JSON.parse(localStorage.getItem("treePrice"));
    let numberOfPeople = JSON.parse(localStorage.getItem("numberOfPeople"));
    this.amountOfTrees = numberOfPeople.numberOfAdults + numberOfPeople.numberOfChildren;
    this.calculateAmount(this.amountOfTrees);
  }

  onPlusBtn() {
    console.log("onPlusBtn: ");
    this.amountOfTrees = this.amountOfTrees + 1;
    this.anotherNumber = true;
    this.calculateAmount(this.amountOfTrees);
  }

  onMinusBtn() {
    console.log("onMinusBtn: ");
    this.anotherNumber = true;
    if (this.amountOfTrees > 1) {
      this.amountOfTrees = this.amountOfTrees - 1;
      this.calculateAmount(this.amountOfTrees);
    }
    else {
      console.log("one plant must be chosen");
    }
  }

  calculateAmount(num: any) {
    console.log("calculateAmount btn; num: " + num);
    this.totalAmount = this.treePrice * num;
  }

  onChangeNumber(amount: number) {
    amount = Number(amount);
    console.log("onChangeNumber: " + amount);
    if (amount == null || amount == 0) {
      this.errMsg = 'You must choose at least one tree';
      this.openModal('error-modal');
      this.amountOfTrees = 1;
    }
    else {
      this.calculateAmount(amount);
      this.amountOfTrees = amount;

    }

  }

  onChooseNext() {
    if (this.amountOfTrees > 0) {
      this.calculateAmount(this.amountOfTrees);
      localStorage.setItem("amountOfTrees", JSON.stringify(this.amountOfTrees));
      this.router.navigate(['donors-details']);
    }
    else if (this.amountOfTrees < 0) {
      this.errMsg = 'please choose a positive number';
      this.openModal('error-modal');
    }
    else {
      this.errMsg = 'please choose an amount of trees';
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
