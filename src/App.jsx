// QuantumGPT App.jsx - OVERRIDE ARCHITECT GODMODE

import React, { useState } from "react";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Auto-Debugger Catch:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Unable to get a response." }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-2 rounded ${msg.role === "user" ? "bg-blue-700 text-right" : "bg-gray-800 text-left"}`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex p-2 bg-gray-900">
        <input
          type="text"
          className="flex-1 p-2 rounded-l bg-gray-700 text-white border-none focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-600 rounded-r hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
