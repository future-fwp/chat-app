const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL || "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true
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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
