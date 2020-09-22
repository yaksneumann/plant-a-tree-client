import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-choose-area',
  templateUrl: './choose-area.component.html',
  styleUrls: ['./choose-area.component.css']
})
export class ChooseAreaComponent implements  AfterViewInit, OnInit {  

  constructor(private router: Router, private modalService: ModalService) { }
  chooseGolani: boolean = false;
  // chooseTzora: boolean = false;
  // plantingCenter: any = 0;
  errMsg: string = '';

  chooseTzora: boolean = true;
  plantingCenter: any = 35;

  ngOnInit() {}

  ngAfterViewInit() {
    this.onChooseTzora();
  }
  onChooseGolani() {
    this.errMsg = 'For planting via ZOOM only Tzora forest is available.';
    this.openModal('error-modal');
    // console.log("onChooseGolani pressed ");
    // this.chooseGolani = true;
    // this.chooseTzora = false;
    // this.plantingCenter = 11;

  }

  onChooseTzora() {
    this.errMsg = '';
    console.log("onChooseTzora pressed ");
    this.chooseTzora = true;
    this.chooseGolani = false;
    this.plantingCenter = 35;
  }

  onChooseNext() {
    if (this.chooseTzora || this.chooseGolani) {
      localStorage.setItem("plantingCenter", this.plantingCenter)
      this.router.navigate(['choose-time']);
    }
    else {
      this.errMsg = 'Please click on one of the locations on the map to choose your preferred planting center';
      this.openModal('error-modal');
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
    console.log("openModal id: " + id)
  }

  closeModal(id: string) {
    this.modalService.close(id);
    console.log("closeModal id: " + id)
  }

}
