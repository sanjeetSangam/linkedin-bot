import { useState } from "react";

function App() {
	const [name, setName] = useState("Guest");

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-gray-100 w-[300px]">
			<div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
				<h1 className="text-3xl font-bold mb-4 md:text-2xl">Introducing AI Bot</h1>
				<p className="text-lg mb-8 md:text-xl">
					AI Bot is an AI-powered browser extension that helps you with your daily tasks.
				</p>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="What's your name?"
					className="bg-gray-200 px-4 py-2 rounded-md w-full md:w-[250px]"
				/>
				<p className="mt-4 md:mt-8">
					Hi {name}, I'm AI Bot. I'll be your AI assistant in the browser.
				</p>
				<p className="mt-4 md:mt-8">
					I can help you with things like generating code, writing emails, and more.
				</p>
			</div>
		</div>
	);
}

export default App;
