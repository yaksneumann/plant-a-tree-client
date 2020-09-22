import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ZoomMeetingRegistration } from '../zoom/zoom-meeting-registration';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class ZoomApiService {
  constructor(private http: HttpClient) { }

 // yaks testing
  createZoomMeeting() {   
    let donersDetailsObj = JSON.parse(localStorage.getItem("donersDetailsObj"));
    // let ceremonyDateAndHour = localStorage.getItem("ceremonyDateAndHour");
    // // let startTime = ceremonyDateAndHour + 'Z';
    let startTime = localStorage.getItem("ceremonyDateAndHour");
    let topic = 'Planting a tree with ' + donersDetailsObj.firstName + " " + donersDetailsObj.lastName; 
   
    const headers = new HttpHeaders();
    //.set('Access-Control-Allow-Origin', '*')
     // .set('Content-Type', 'application/json;charset=UTF-8')
      //.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlRYaUx2LXVjUVRtMnNHZWdHVDdoOVEiLCJleHAiOjE1OTMwMDU3MjMsImlhdCI6MTU5MjQwMDkyM30.AZtNESURNM0VqKhENSmzDA8LIwVb78qAV0COeN2JeUQ');
    var data = {
      "topic": topic,
      "type": "2",
      "start_time": startTime,
      "duration": "30",
      "timezone": "Asia/Jerusalem",  
      "agenda": "planting a tree in israel, KKL-JNF",
      "global_dial_in_countries": [],
      //"schedule_for": "zoom-PlantATree@kkl.org.il",
      "settings": {
        "host_video": "true",
        "participant_video": "true",
        "join_before_host": "true",
        "mute_upon_entry": "false",
        "watermark": "false",
        "approval_type": "2",
        "waiting_room" : "false",
        "use_pmi": "false",
        "audio": "voip",
        "auto_recording": "cloud",       
        "contact_email": "zoom-PlantATree@kkl.org.il",
        "contact_name": "Eran Zavadi",
        "registrants_email_notification": "false",
        "enforce_login_domains": "zoom-PlantATree@kkl.org.il",
        "alternative_hosts": "zoom-PlantATree@kkl.org.il"
      }
    }

     return this.http.post(`${environment.yairApiUrl}`, data, { headers });
    //return this.http.post(`${environment.zoomApiUrl}`, data, { headers });
  }
  // createZoomMeeting() {
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

  //   return this.http.get(`${environment.yairApiUrl}`, { headers });
  // }
}

    ////from yair
    // createZoomMeeting(meetingRegistration: ZoomMeetingRegistration): Observable<any> {
    //   return this.http.post(environment.zoomApiUrl, meetingRegistration).pipe(
    //     map(res => {
    //       console.log(res);
    //       // yakov, look into the response and get what you need from it...
    //       // you may use a response type for a bette clarity
    //       return res;
    //     }))
    // }
