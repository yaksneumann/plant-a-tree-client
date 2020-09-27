import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent  implements AfterViewInit, OnInit {

  constructor(private modalService: ModalService, private router: Router) {}

  public edited = true;
  public Footerfull = false;
  ngOnInit() { 
    window.scroll(0,0);
    $(".kkl-icon1").css("width","50%");
    $(".kkl-icon2").css("width","35%");
    document.body.classList.add('nobackround'); 
  }

  goToLinkPricacy(){
    window.open("https://www.kkl-jnf.org/privacy-policy/", "_blank");
  }

  orderplants(){
    document.body.classList.remove('nobackround');
    this.router.navigate(['choose-orderplants']);
  }

  OpenScroll(){
    this.edited = true;
  }
  ngAfterViewInit() {
    localStorage.clear();
   // this.openModal('error-modal');
  }
  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


}

