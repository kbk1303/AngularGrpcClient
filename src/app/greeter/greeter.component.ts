import { Component, OnInit } from '@angular/core';
import { HelloReply, HelloRequest } from 'src/protobuf/generated/greet_pb';
import { GreeterClient, ServiceError } from 'src/protobuf/generated/greet_pb_service';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent implements OnInit {
  response: string;

  constructor() { }

  ngOnInit(): void {
    const client = new GreeterClient('http://localhost:5000');
    const req = new HelloRequest();
    req.setName("World!");
    client.sayHello(req, (err: ServiceError, response: HelloReply) => {
      if (err) {
        console.error(err);
        this.response = `Error: {err.message}`;
        return;
      }

      this.response = response.getMessage();
    });

  }

}
