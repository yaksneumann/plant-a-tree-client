import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  shareViaWhatsapp() {
    //to specific no.
    //window.location.href = 'whatsapp://send?text=' + 'hey dude' + '&phone=+972' + '528026670';  }
     //window.open('whatsapp://send?text=' + 'hey dude' + '&phone=+972' + '528026670');
     window.open("https://api.whatsapp.com/send?text=%20*Hey,%0AYou shoud check this out%0AI am all set to plant a tree in Israel! It's going to be lot's of fun%0Ahttps://apis.kkl.org.il/PlantaTreeInIsrael/home-page");
   }
 
   shareViaEmail() {
     //whatsapp://send?text=message
     window.open('whatsapp://send?text=hi man');  
   }
 
   shareViaFacebook() {
     window.open("https://www.facebook.com/kkl.org.il");  
   }

   shareViaTwit() {
    window.open("https://twitter.com/intent/tweet");
  }

   //

   shareViaWhatsapp2() {
    window.open("whatsapp://send?text=Hello%20World!%0AAnother%20Word")
    //window.open("whatsapp://send?text=Hello%20World!%0AAnother%20Word")
 
   }
 
   shareViaEmail2() {
     //whatsapp://send?text=message
     window.location.href = 'whatsapp://send?text=hi man';  
   }
 
   shareViaFacebook2() {
     window.open("https://www.instagram.com/kkl_jnf/");
   }

   shareViaTwit2() {
    //window.location.replace("./assets/img/certificate.pdf");

    window.open("https://twitter.com/intent/tweet?url=http%3A%2F%2Fcss-tricks.com%2F&text=Tips%2C+Tricks%2C+and+Techniques+on+using+Cascading+Style+Sheets.&hashtags=css,html");
  }
   
  viewCertificatePdf() {
 // window.open("./assets/img/certificate.pdf", "");
  //   window.open("./assets/img/certificate-back.pdf", "_blank");
    window.open("./assets/img/certificate.pdf");

    // window.location.replace("./assets/img/certificate.pdf");

    //window.location.replace("./assets/img/certificate.pdf");
  }
 }
 
