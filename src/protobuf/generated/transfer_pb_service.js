// package: transfer
// file: transfer.proto

var transfer_pb = require("./transfer_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Transfer = (function () {
  function Transfer() {}
  Transfer.serviceName = "transfer.Transfer";
  return Transfer;
}());

Transfer.TransferData = {
  methodName: "TransferData",
  service: Transfer,
  requestStream: false,
  responseStream: false,
  requestType: transfer_pb.TransferRequest,
  responseType: transfer_pb.TransferResponse
};

Transfer.FetchVideo = {
  methodName: "FetchVideo",
  service: Transfer,
  requestStream: true,
  responseStream: true,
  requestType: transfer_pb.VideoRequest,
  responseType: transfer_pb.VideoResponse
};

exports.Transfer = Transfer;

function TransferClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TransferClient.prototype.transferData = function transferData(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Transfer.TransferData, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TransferClient.prototype.fetchVideo = function fetchVideo(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Transfer.FetchVideo, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.TransferClient = TransferClient;

