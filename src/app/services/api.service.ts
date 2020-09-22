import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from '../../environments/environment';  //org
import { AvailableDate } from '../../app/calander/availableDate';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  getAllDates(): Observable<Array<AvailableDate>> {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}getAllDates`, { headers })
      .pipe(map((data: Array<object>) => {
        //console.log(data);
        var availableDates = new Array<AvailableDate>();
        for (let i = 0; i < data.length; i++) {
          let ad = new AvailableDate();
          let d = new Date(data[i]['RunDate'])
          ad.date = new NgbDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
          ad.isAvailable = data[i]['IsAvailable'] == 1 ? true : false;
          availableDates.push(ad);
        }
        return availableDates
      }));

  }


  //ad.RunDate = new NgbDate();
  // ad.IsAvailable = data.IsAvailable === 1 ? true : false  

  // map(event => this.getEventMessage(event, file)),
  // tap(message => this.showProgress(message)),
  // last(), // return last (completed) message to caller
  // catchError(this.handleError(file))



  getAvailableDates() {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}getAvailableDates`, { headers });
  }

  GetCountries() {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetCountries`, { headers });
  }

  GetNotAvailableDates() {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetNotAvailableDates`, { headers });
  }

  GetIsAvailableDate(date: any) {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetIsAvailableDate/` + date, { headers });
  }

  GetAvailableTimes(area: any, CeremonyDate: any) {
    let plantingCenter = localStorage.getItem("plantingCenter");
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetAvailableTimes/` + plantingCenter + '/' + CeremonyDate, { headers });
  }

  getDonorsTitle() {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetDonorTitle`, { headers });
  }


  getItemPrice(item: number) {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetItemPrice/` + item, { headers });
  }

  GetPlantAreaDetails(code: any) {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetPlantAreaDetails/` + code, { headers });
  }

  OpenPlantEvent(acceptEmail: any) {
    let donersDetailsObj = JSON.parse(localStorage.getItem("donersDetailsObj"));
    let numberOfPeople = JSON.parse(localStorage.getItem("numberOfPeople"));
    let amountOfTrees = JSON.parse(localStorage.getItem("amountOfTrees"));
    let blueBoxes = JSON.parse(localStorage.getItem("amountOfBoxes"));
    let amountOfCaps = JSON.parse(localStorage.getItem("amountOfCaps"));
    let totalSum = JSON.parse(localStorage.getItem("totalSum"));
    let plantingCenter = JSON.parse(localStorage.getItem("plantingCenter"));
    let ceremonyDateAndHour = localStorage.getItem("ceremonyDateAndHour");
    let text = localStorage.getItem("certificateText");

    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    var data =
    {
      "plantingCenter": plantingCenter,
      "CeremonyDateHour": ceremonyDateAndHour,
      "AdultsNum": numberOfPeople.numberOfAdults,
      "kidsNum": numberOfPeople.numberOfChildren,
      "NumberOfTrees": amountOfTrees,
      "FirstName": donersDetailsObj.firstName,
      "LastName": donersDetailsObj.lastName,
      "email": donersDetailsObj.email,
      "Tel": donersDetailsObj.phone,
      "CountryCode": donersDetailsObj.countryId,
      "kklHats": amountOfCaps,
      "TotalSum": totalSum,
      "israeliPhone": donersDetailsObj.israeliPhone,
      "DonorTitle": donersDetailsObj.donorsTitle,
      "blueBoxes": blueBoxes,
      "CertificateText": text,
      "acceptEmail": acceptEmail

      

      //,"zoomEvent": 1 for zoom, 1 = zoom 0=no zoom, 2=maybe
    }
    console.log('OpenPlantEvent data: ');
    console.log({ data });
    return this.http.post(`${environment.apiUrl}OpenPlantEvent`, data, { headers });
  }

  // fo updating the certificate
  updateCertificate(ceremonyID: number, text: string) {
    //let text = localStorage.getItem("certificateText");
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
    var data =
    {
      "CeremonyID": ceremonyID,
      "CertificateText": text
    }

    console.log('EventCertificate data: ' + data);
    return this.http.post(`${environment.apiUrl}EventUpdateCertificate`, data, { headers });
  }

        //del 1-7-20 we added it to OpenPlantEvent   
  // certificateText(ceremonyID: number) {
  //   let text = localStorage.getItem("certificateText");
  //   const headers = new HttpHeaders().set('kkl-agent', '1')
  //     .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
  //   var data =
  //   {
  //     "CeremonyID": ceremonyID,
  //     "CertificateText": text
  //   }

  //   console.log('EventCertificate data: ' + data);
  //   return this.http.post(`${environment.apiUrl}EventCertificate`, data, { headers });
  // }

  insertItems(ceremonyID: number) {
    let amountOfTrees = JSON.parse(localStorage.getItem("amountOfTrees"));
    let blueBoxes = JSON.parse(localStorage.getItem("amountOfBoxes"));
    let amountOfCaps = JSON.parse(localStorage.getItem("amountOfCaps"));

    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    var data =
    {
      "CeremonyID": ceremonyID,
      "ItemObject": [{ "ItemCode": "1088", "Amount": amountOfCaps }, { "ItemCode": "1065", "Amount": amountOfTrees }, { "ItemCode": "1004", "Amount": blueBoxes }]
    }
    console.log('insertItems data: ' + data);
    return this.http.post(`${environment.apiUrl}insertItems`, data, { headers });
  }

  GetUrlForSlika(ceremonyID: number) {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}GetUrlForSlika/` + ceremonyID, { headers });
  }

  makeDebit(urlQueryParams: any, ceremonyID: number) {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    var data = {
      "ceremonyId": ceremonyID,
      "lang": urlQueryParams.lang,
      "token": urlQueryParams.cardToken,
      "uniqueID": urlQueryParams.uniqueID,
      "userData1": urlQueryParams.userData1,
      "cardExp": urlQueryParams.cardExp
    }
    console.log('urlQueryParams data : ' + data);
    return this.http.post(`${environment.apiUrl}makeDebit`, data, { headers });
  }

  ceremonyDetails(ceremonyID: any) {
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.apiUrl}CeremonyDetails/` + ceremonyID, { headers });
  }

  // zoom 18-6-20
  zoomMeetingUrl(ceremonyID: any, joinUrl: string) {
    //let meetingLink = localStorage.getItem("meetingLink") || '';       
    const headers = new HttpHeaders().set('kkl-agent', '1')
      .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
    var data =
    {
      "CeremonyID": ceremonyID,
      "JoinUrl": joinUrl
    }
    //console.log('meetingLink data: ' + data);
    return this.http.post(`${environment.apiUrl}ZoomMeetingTaEtzEvent`, data, { headers });
  }
}
