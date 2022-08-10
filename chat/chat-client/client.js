let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");
let readline = require("readline");
//Read terminal Lines
let reader = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});
//Load the protobuf
let proto = grpc.loadPackageDefinition(
 protoLoader.loadSync("/Users/kai/Documents/Universidad de Antioquia/Semestre 7/Arquitectura de software/labrpc/chat/proto/chat.proto", {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true
 })
);
const REMOTE_SERVER = "0.0.0.0:2022";
let username;
//Create gRPC client
let client = new proto.chatGroup.Chat(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
   );

   // Primero pedimos el nombre del usuario
   reader.question("Ingrese su nombre: ", answer => {
    username = answer;
    startChat();
   });

   // Funcion para iniciar el chat
   let startChat =() => {
    // Creación del canal
    let canal = client.join();
    // Se escribe el mensaje en el canal
    canal.write({user: username, text: "Estoy ingresando a la conversación..."});
    // get the data from response
    canal.on("data",(message) => {
    if (message.user == username) {
    return;
    }
    console.log(`${message.user}: ${message.text}`);
    });
    // Read the line from terminal
    reader.on("line", (text) => {
    canal.write({user: username, text: text});
    });
   }