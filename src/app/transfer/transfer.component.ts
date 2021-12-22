import { Component, OnInit } from '@angular/core';
import { TransferRequest, TransferResponse } from 'src/protobuf/generated/transfer_pb';
import { TransferClient, ServiceError } from 'src/protobuf/generated/transfer_pb_service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  error: string = undefined;
  userId: string = undefined;
  loggedIn : boolean = false;

  constructor() { }

  ngOnInit(): void {
    const client = new TransferClient('https://skp-instructor.sbs:5001');
    //const client = new TransferClient('https://localhost:5001');
    const req = new TransferRequest();
    req.setUsername("Kris");
    req.setPassword("Maagodt1234§");

    client.transferData(req, (err: ServiceError, response: TransferResponse) => {
      if(err) {
        this.error = err.message;
        console.error(err.message);
      }
      this.loggedIn = response.getLoggedin();
      this.userId = response.getUserid();
    });
  }

}
