import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalService } from '../services/modal.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements AfterViewInit, OnInit {

  constructor(private api: ApiService, private router: Router,
    private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private modalService: ModalService) { }

  errMsg: string = '';
  ceremonyID: number;
  urlQueryParams: any;
  payAgain: boolean = false;

  ngOnInit() { }

  ngAfterViewInit() {

    this.ceremonyID = JSON.parse(localStorage.getItem("ceremonyID")) || 0;
    let activatedRoute = this.activatedRoute;
    console.log({ activatedRoute });

    this.urlQueryParams = this.activatedRoute.snapshot.queryParams;

    if (this.urlQueryParams.ErrorCode && this.urlQueryParams.ErrorCode != '000') {

      this.payAgain = true;
      //this.errMsg = "We are very sorry\n" + this.urlQueryParams.ErrorText;
      //this.errMsg = this.urlQueryParams.ErrorText;
      this.errMsg = "There has been some error with the credit card, please try again";
      this.openModal('error-modal');
    }
    else {
      this.spinner.show();
      this.api.makeDebit(this.urlQueryParams, this.ceremonyID).subscribe((data: any) => {
        this.spinner.hide();
        console.log({ data });
        if (data[0].RetCode == '0') {
           this.router.navigate(['payment-successful']);
        }
        else {
          this.errMsg = data[0].UrlPage;
          this.openModal('error-modal');
        }
      },
        error => {
          this.spinner.hide();
          this.errMsg = error.message;
          if (error.statusText == "Unknown Error") {
            this.errMsg = 'Sorry, there is some connection problem, please try again';
          }
          this.openModal('error-modal');
        });
    }
  }

  getUrlFunc() {
    this.api.GetUrlForSlika(this.ceremonyID).subscribe((data: any) => {
      if (data[0].RetCode == 'ok') {
        console.log({ data });
        window.open(data[0].UrlPage, '_self');
        //this.router.navigate(['payment-page']);
      } else {
        // RetCode: "error"
        // UrlPage: "error- 682 : MPI Transaction validation failed"

        this.errMsg = data[0].UrlPage;
        this.openModal('error-modal');
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
  }

  openModal(id: string) {
    this.modalService.open(id);
    console.log("openModal id: " + id)
  }

  closeModal(id: string, goToPayment: boolean) {
    if (goToPayment) {
      this.getUrlFunc();
    }
    this.payAgain = false;
    this.modalService.close(id);
    console.log("closeModal id: " + id);
  }

}
