"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 হাই! আমি FoodHub সহায়ক। আপনার অর্ডার, মেনু, বা অন্যকিছু সম্পর্কে প্রশ্ন থাকলে জিজ্ঞাসা করুন!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.message,
          timestamp: new Date(data.data.timestamp),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        toast.error("চ্যাট পাঠাতে সমস্যা হয়েছে");
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("সার্ভার সংযোগ ত্রুটি");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className='fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 active:scale-95'
        aria-label='Open chat'
        title='FoodHub সহায়ক খুলুন'>
        <MessageCircle className='h-6 w-6' />
        <span className='text-sm font-semibold hidden sm:inline'>Chat</span>
      </button>
    );
  }

  return (
    <div className='fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl bg-white flex flex-col h-96 md:h-[500px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300'>
      {/* Header */}
      <div className='flex items-center justify-between bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 md:p-5'>
        <div className='flex items-center gap-2'>
          <MessageCircle className='h-5 w-5' />
          <div>
            <h3 className='font-bold text-sm md:text-base'>FoodHub সহায়ক</h3>
            <p className='text-xs md:text-sm opacity-90'>সর্বদা আপনার সেবায়</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className='p-1 hover:bg-white/20 rounded-lg transition'
          aria-label='Close chat'>
          <X className='h-5 w-5' />
        </button>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 md:p-5 space-y-4 bg-gray-50'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}>
            <div
              className={`max-w-xs md:max-w-sm rounded-xl px-4 py-2 text-sm md:text-base ${
                message.role === "user"
                  ? "bg-red-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
              }`}>
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className='flex justify-start'>
            <div className='bg-white border border-gray-200 rounded-xl rounded-bl-none px-4 py-3'>
              <div className='flex gap-1'>
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100'></div>
                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200'></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className='border-t border-gray-200 p-4 md:p-5 bg-white'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='বার্তা লিখুন...'
            disabled={isLoading}
            className='flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm md:text-base focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 disabled:bg-gray-100'
          />
          <button
            type='submit'
            disabled={isLoading || !inputValue.trim()}
            className='bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg p-2 transition'>
            <Send className='h-5 w-5' />
          </button>
        </div>
      </form>
    </div>
  );
}
