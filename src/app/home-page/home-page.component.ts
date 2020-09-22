import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent  implements AfterViewInit, OnInit {

  constructor(private modalService: ModalService) {}

  public edited = false;
  public Footerfull = false;
  ngOnInit() { 
    
    $(".kkl-icon1").css("width","50%");
    $(".kkl-icon2").css("width","30%");
  }

  goToLinkPricacy(){
    window.open("https://www.kkl-jnf.org/privacy-policy/", "_blank");
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

