import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
tester:string;
    constructor(public translate: TranslateService,private modalService: ModalService, private router: Router) {
    translate.addLangs(['en', 'fr', 'it', 'de', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|it|de|es/) ? browserLang : 'en');
     
   // translate.get('HOME-PAGE.select').subscribe((res: string) => {
   //   console.log(res); 
 // });
 
  }

  public NavbarExist = true;
  ngOnInit() {

    this.translate.get('HOME-PAGE.select').subscribe((res: string) => {
      console.log(res); 
  });

    console.log("new multi lang: 14-6-20");

 
    

  }

}
