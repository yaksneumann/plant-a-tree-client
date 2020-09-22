import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-treasure-hunt',
  templateUrl: './treasure-hunt.component.html',
  styleUrls: ['./treasure-hunt.component.css']
})
export class TreasureHuntComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  question1: boolean = false;
  question2: boolean = false;
  question3: boolean = false;
  question4: boolean = false;
  question5: boolean = false;
  question6: boolean = false;
  question7: boolean = false;
  question8: boolean = false;

  errMsg: string = '';
  urlQueryParams: any;

  ngOnInit() {
    this.urlQueryParams = this.activatedRoute.snapshot.queryParams;
    console.log('this.urlQueryParams' + this.urlQueryParams);
    switch (this.urlQueryParams.question) {
      case "1":
        this.question1 = true;
        break;
      case 2:
        // code block
        break;
      case 3:
        // code block
        break;
      case 4:
        // code block
        break;
      default:
      // code block
    }

  }

}
