// package: transfer
// file: transfer.proto

import * as transfer_pb from "./transfer_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TransferTransferData = {
  readonly methodName: string;
  readonly service: typeof Transfer;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof transfer_pb.TransferRequest;
  readonly responseType: typeof transfer_pb.TransferResponse;
};

type TransferFetchVideo = {
  readonly methodName: string;
  readonly service: typeof Transfer;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof transfer_pb.VideoRequest;
  readonly responseType: typeof transfer_pb.VideoResponse;
};

export class Transfer {
  static readonly serviceName: string;
  static readonly TransferData: TransferTransferData;
  static readonly FetchVideo: TransferFetchVideo;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TransferClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  transferData(
    requestMessage: transfer_pb.TransferRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: transfer_pb.TransferResponse|null) => void
  ): UnaryResponse;
  transferData(
    requestMessage: transfer_pb.TransferRequest,
    callback: (error: ServiceError|null, responseMessage: transfer_pb.TransferResponse|null) => void
  ): UnaryResponse;
  fetchVideo(metadata?: grpc.Metadata): BidirectionalStream<transfer_pb.VideoRequest, transfer_pb.VideoResponse>;
}

