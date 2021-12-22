import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, ObservableLike } from 'rxjs';
import { VideoRequest, VideoResponse } from 'src/protobuf/generated/transfer_pb';
import { Status, TransferClient } from 'src/protobuf/generated/transfer_pb_service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  stringWebm : string = "data:video/webm;base64,";
  stringMp4 : string = "data:video/mp4;base64,";
  sanitizedWebM : SafeUrl;
  sanitizedMp4 : SafeUrl;
  bytesReceivedHolder: Uint8Array[] = [];
  bytesReceived: Uint8Array;
  bytesReceivedRaw: string;
  charFromCode : any;
  stringB64: string = '';
  stringB64PB: string = '';
  streamsReady = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const client = new TransferClient('https://skp-instructor.sbs:5001');
    //const client = new TransferClient('https://localhost:5001');
    const req = new VideoRequest();
    req.setAlive(true);
    req.setVideoid(1);
    let count = 0;

    const data = client.fetchVideo();
    data.write(req);
    data.on('status', (status: Status) => {
      console.log('Transfer.video status', status);
    });
    data.on('data', (message: VideoResponse) => {
      count++;
      //console.log('timestamp: '+message.getTimestamp());
      this.bytesReceivedHolder.push(message.getBuffer_asU8());

    });

    data.on('end', () => {
      this.bytesReceived = this.concatenate(this.bytesReceivedHolder);
      //console.log('data received: '+this.bytesReceived.length);
      this.charFromCode = this.charEncode(this.bytesReceived);
      this.stringB64 = btoa(this.charFromCode);
      this.stringMp4 += this.stringB64;
      this.stringWebm += this.stringB64;
      this.sanitizedMp4 = this.sanitizer.bypassSecurityTrustUrl(this.stringMp4);
      this.sanitizedWebM = this.sanitizer.bypassSecurityTrustUrl(this.stringWebm);
      this.streamsReady = true;
      console.log('data buffered and ready');
    });
  }

  bytifyVideo() : SafeUrl {
    let ret: SafeUrl;

    return ret;
  }

  concatenate(arrays: Uint8Array[]) {
    let totalLength = 0;
    for (const arr of arrays) {
      totalLength += arr.length;
    }
    console.log('total length is: '+totalLength)
    const result = new Uint8Array(totalLength);

    let offset = 0;
    for (const arr of arrays) {
      result.set(arr, offset);
      offset += arr.length;
    }

    result.set(arrays[0], 0)
    return result;
  }

charEncode(array: Uint8Array) : string {
  let ret: string = "";
  for(var i = 0; i < array.length; i++) {
    ret += String.fromCharCode(array[i]);
  }
  return ret;
}

}
