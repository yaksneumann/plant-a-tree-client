import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  constructor() { }

  plantingCenter: number = 0;
  
  ngOnInit() {
    this.plantingCenter = JSON.parse(localStorage.getItem("plantingCenter"));
  }

  
  openWaze() {
    if (this.plantingCenter == 11) {
      window.open("waze://?ll=32.78844,35.43770&navigate=yes");
    }
    else {
      window.open("waze://?ll=31.78794,34.99377&navigate=yes");
    }
  }

  openGooglemaps() {
    if (this.plantingCenter == 11) {
      window.open("http://maps.google.com/maps?q=Plant+a+Tree+–+Lavi+Forest");
    }
    else {
      window.open("http://maps.google.com/maps?q=Plant+a+Tree+–+Tzora+Forest");

    }                                                                                                                                                                                                                                                                                                                                                                                                                       
  }

}
