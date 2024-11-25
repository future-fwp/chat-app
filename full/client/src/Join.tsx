import React, { useState } from "react";

interface JoinProps {
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
}

const Join: React.FC<JoinProps> = ({ setUsername, setIsJoined }) => {
	const [inputUsername, setInputUsername] = useState<string>("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (inputUsername.trim()) {
			setUsername(inputUsername.trim());
			setIsJoined(true);
		}
	};

	return (
		<div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
			<h1 className="text-xl font-bold mb-4">Join Chat</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col"
			>
				<input
					type="text"
					placeholder="Enter your username"
					value={inputUsername}
					onChange={(e) => setInputUsername(e.target.value)}
					className="p-2 mb-4 border border-gray-400 rounded"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded"
				>
					Join Chat
				</button>
			</form>
		</div>
	);
};

export default Join;
