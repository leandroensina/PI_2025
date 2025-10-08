const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 8080 });

app.use(express.static('public'));

// Lista de clientes conectados
let clients = [];

wss.on('connection', (socket) => {
	console.log('Novo usuário conectado');
	clients.push(socket);
	
	socket.on('message', (msg) => {
		console.log(msg.toString())
		clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(msg.toString());
			}
		});
	});
	
	socket.on('close', () => {
		console.log('Usuário desconectado');
	});

	socket.on('open', (msg) => {
		console.log("msg");
	});
});

server.listen(3000, () => {
	console.log('Servidor rodando em http://localhost:3000');
});