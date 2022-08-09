let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const URL = "0.0.0.0:2022";

let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("../proto/inicio.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
)