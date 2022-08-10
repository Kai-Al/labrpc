let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');

const server = new grpc.Server();
const SERVER_ADDRESS = '0.0.0.0:2022';

let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("/Users/kai/Documents/Universidad de Antioquia/Semestre 7/Arquitectura de software/labrpc/chat/proto/chat.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
)

// Arreglo de usuarios conectados

let usuarios = [];

// Funcion para agregar un usuario al arreglo de usuarios

function join(call){
    usuarios.push(call);
    call.on('data', (message)=>{
        sendNotification({user:message.user, text: message.text});
    }) 
}

// Funcion para enviar un mensaje a todos los usuarios conectados
let sendNotification = (message)=>{
    usuarios.forEach(user=>{
        user.write(message);
    } )
}

server.addService(proto.chat.Chat.service, {join:join});

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());


