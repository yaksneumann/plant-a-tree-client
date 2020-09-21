import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'it', 'de', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|it|de|es/) ? browserLang : 'en');
     
  }

  public NavbarExist = true;
  ngOnInit() {
    console.log("new multi lang: 14-6-20");
  }

}
