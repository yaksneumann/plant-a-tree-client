import { Component, OnInit } from '@angular/core';

import { ZoomMtg } from '@zoomus/websdk';
 
import { ZoomApiService } from 'src/app/services/zoom-api.service';
import { ZoomMeetingRegistration } from './zoom-meeting-registration';
import { ModalService } from '../services/modal.service';
import { NgxSpinnerService } from 'ngx-spinner';

    // ZoomMtg.preLoadWasm();
    // ZoomMtg.prepareJssdk();
    
@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})

export class ZoomComponent implements OnInit {

  constructor(private zoomApi: ZoomApiService, private modalService: ModalService, private spinner: NgxSpinnerService) {}

  errMsg: string = '';
  msg: string;
  zoomMeetingRegistration: ZoomMeetingRegistration;
  signatureEndpoint: string = 'http://localhost:4000';
  apiKey: string = 'JWT_API_KEY';
  meetingNumber:number = 123456789;
  role: number = 0;
  leaveUrl: string = 'http://localhost:9999';
  userName: string = 'WebSDK';
  userEmail: string = '';
  passWord: string = '';
  signature: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlRYaUx2LXVjUVRtMnNHZWdHVDdoOVEiLCJleHAiOjE1OTI5MDA4NTIsImlhdCI6MTU5MjI5NjA1M30.pfky8jEZzrXuxlr5urGJiKKeNg4LZjhIvAE8rwH1rOY';

  ngOnInit(): void {
    //demo data
    this.zoomMeetingRegistration = new  ZoomMeetingRegistration();
    this.zoomMeetingRegistration.startTime = new Date("2020-06-17T20:00:00Z");
    this.zoomMeetingRegistration.timeZone = "Asia/Jerusalem";
    this.zoomMeetingRegistration.topic = "Dr. Martin Jr. Planting a tree in Israel";
    this.zoomMeetingRegistration.type = 2;

    // ZoomMtg.preLoadWasm();
    // ZoomMtg.prepareJssdk();
    //ZoomMtg.setZoomJSLib('http://localhost:9999/custom/path/to/lib/', '/av')
  }
  
  registerNewMeeting(){

    this.spinner.show();
    this.zoomApi.createZoomMeeting().subscribe((data: Array<any>) => {
      if (data) {
        console.log({ data });
      }
      else {
        console.log('no data in registerNewMeeting');
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
    //this.zoomApi.createZoomMeeting(this.zoomMeetingRegistration).subscribe(res => this.msg = res)
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}