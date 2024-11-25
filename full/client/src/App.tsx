import React, { useState } from "react";
import Chat from "./Chat.tsx";
import Join from "./Join.tsx";

const App: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [isJoined, setIsJoined] = useState<boolean>(false);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			{isJoined ? (
				<Chat username={username} />
			) : (
				<Join
					setUsername={setUsername}
					setIsJoined={setIsJoined}
				/>
			)}
		</div>
	);
};

export default App;
