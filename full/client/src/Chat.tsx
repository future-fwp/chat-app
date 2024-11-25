import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface ChatProps {
	username: string;
}

interface Message {
	user: string;
	message: string;
	time: string;
}

const Chat: React.FC<ChatProps> = ({ username }) => {
	const [message, setMessage] = useState<string>("");
	const [messages, setMessages] = useState<Message[]>([]);
	const socket: Socket = io("http://localhost:3001");

	useEffect(() => {
		socket.on("chat message", (msg: Message) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		return () => {
			socket.disconnect();
		};
	}, [socket]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (message.trim()) {
			const msgObject: Message = {
				user: username,
				message,
				time: new Date().toLocaleTimeString(),
			};
			socket.emit("chat message", msgObject);
			setMessages((prevMessages) => [...prevMessages, msgObject]);
			setMessage("");
		}
	};

	return (
		<div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
			<h1 className="text-xl font-bold mb-4">React Chat</h1>
			<div className="h-64 bg-gray-200 p-4 rounded overflow-y-auto mb-4">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`mb-2 ${msg.user === username ? "text-right" : ""}`}
					>
						<div
							className={`inline-block p-2 rounded ${
								msg.user === username ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
							}`}
						>
							<strong>{msg.user}</strong>: {msg.message}
						</div>
						<div className="text-xs text-gray-600">{msg.time}</div>
					</div>
				))}
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex"
			>
				<input
					type="text"
					placeholder="Type a message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="flex-grow p-2 border border-gray-400 rounded-l"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded-r"
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default Chat;
