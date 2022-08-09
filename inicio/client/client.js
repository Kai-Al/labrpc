let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");
let readLine = require("readline");

let reader = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("../proto/inicio.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
)

const remoteURL = "0.0.0.0:2022";

let client = new proto.inicio.Inicio(remoteURL, grpc.credentials.createInsecure());

reader.question("Ingrese su nombre: ", (nombre) => {
    client.Mensaje({ nombre: nombre }, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response.mensaje);
        }
        reader.close();
    });
});