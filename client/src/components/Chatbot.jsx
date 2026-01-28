import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Air Quality Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      // Simple bot responses
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes("aqi")) {
      return "AQI stands for Air Quality Index. It measures air pollution levels. Lower values indicate better air quality.";
    } else if (lowerInput.includes("pollutant")) {
      return "Common air pollutants include PM2.5, PM10, NO2, SO2, CO, and O3. Each has different health impacts.";
    } else if (lowerInput.includes("health")) {
      return "Poor air quality can affect respiratory health, cardiovascular system, and overall well-being. Check our precautions page for more info.";
    } else {
      return "I'm here to help with air quality questions. Try asking about AQI, pollutants, or health effects!";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <div className="h-64 overflow-y-auto mb-4 p-2 border rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${
              msg.sender === "user" 
                ? "bg-blue-500 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 mr-2"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default Chatbot;