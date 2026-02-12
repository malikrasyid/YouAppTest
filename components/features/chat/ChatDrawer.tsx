"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { X, Send } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { ChatMessage } from "../../../types/chat";
import { chatApi } from "../../../lib/api";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer = ({ isOpen, onClose }: ChatDrawerProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [myUsername, setMyUsername] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // A. Decode Username
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setMyUsername(payload.username);
    } catch (e) { console.error("Token error", e); }

    // B. Connect Socket
    socketRef.current = io("http://localhost:3001", {
      auth: { token },
    });

    socketRef.current.on("receiveMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    // C. Fetch History (Using the new API function)
    const loadHistory = async () => {
      try {
        const history = await chatApi.getHistory(); // <--- Clean 1-liner
        setMessages(history);
        setHasLoadedHistory(true);
      } catch (error) {
        // Error is logged in api.ts, just handle UI state here if needed
      }
    };

    loadHistory();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;    
    socketRef.current.emit("sendMessage", { content: input });    
    setInput("");
  };

  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0E191F] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-white/10 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0E191F] z-10">
          <h2 className="text-white font-bold text-lg">General Chat</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/70 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#0E191F]">
           {messages.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-2">
               <span className="text-4xl">👋</span>
               <p className="text-sm">No messages yet.</p>
             </div>
           ) : (
             messages.map((msg) => (
                <MessageBubble 
                  key={msg.id} 
                  isMe={msg.sender === myUsername}
                  username={msg.sender} 
                  content={msg.content} 
                  timestamp={new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                />
              ))
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#0E191F]">
          <div className="flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-amber-200/50 transition-colors">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/30"
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim()} 
              className="ml-2 text-amber-200 hover:text-amber-100 disabled:opacity-50 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};