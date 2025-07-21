import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectThread({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    const res = await axios.get(`/api/thread/${projectId}`);
    setMessages(res.data);
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    await axios.post(`/api/thread`, { projectId, author: "user", message });
    setMessage("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [projectId]);

  return (
    <div className="space-y-4">
      <form onSubmit={submitMessage} className="flex space-x-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full"
          placeholder="Write a comment..."
        />
        <button className="bg-blue-500 text-white px-4 rounded">Send</button>
      </form>

      <div className="space-y-2">
        {messages.map((msg) => (
          <div key={msg._id} className="bg-gray-100 p-2 rounded">
            <div className="text-sm text-gray-500">{msg.author} @ {new Date(msg.timestamp).toLocaleString()}</div>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
