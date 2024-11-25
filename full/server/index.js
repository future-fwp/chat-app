const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});

	socket.on("chat message", (msg) => {
		console.log(`Message received: ${msg}`);
		io.emit("chat message", msg);
	});
});

server.listen(3001, () => {
	console.log("Listening on port 3001");
});
