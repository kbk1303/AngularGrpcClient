// package: transfer
// file: transfer.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class VideoRequest extends jspb.Message {
  getVideoid(): number;
  setVideoid(value: number): void;

  getAlive(): boolean;
  setAlive(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VideoRequest): VideoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoRequest;
  static deserializeBinaryFromReader(message: VideoRequest, reader: jspb.BinaryReader): VideoRequest;
}

export namespace VideoRequest {
  export type AsObject = {
    videoid: number,
    alive: boolean,
  }
}

export class VideoResponse extends jspb.Message {
  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getBase64string(): string;
  setBase64string(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VideoResponse): VideoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoResponse;
  static deserializeBinaryFromReader(message: VideoResponse, reader: jspb.BinaryReader): VideoResponse;
}

export namespace VideoResponse {
  export type AsObject = {
    buffer: Uint8Array | string,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    base64string: string,
  }
}

export class TransferRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransferRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TransferRequest): TransferRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransferRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransferRequest;
  static deserializeBinaryFromReader(message: TransferRequest, reader: jspb.BinaryReader): TransferRequest;
}

export namespace TransferRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class TransferResponse extends jspb.Message {
  getLoggedin(): boolean;
  setLoggedin(value: boolean): void;

  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransferResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransferResponse): TransferResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransferResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransferResponse;
  static deserializeBinaryFromReader(message: TransferResponse, reader: jspb.BinaryReader): TransferResponse;
}

export namespace TransferResponse {
  export type AsObject = {
    loggedin: boolean,
    userid: string,
  }
}

