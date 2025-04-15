'use client';
import { useState, useRef, useEffect } from 'react';
import {getAIChat} from "@/app/lib/api";
import {ChatbotComponent} from "@/app/components/ChatbotComponent/ChatbotComponent";

/**
 * ChatPage component handles the user chat functionality.
 * It allows users to send messages, receive AI-generated responses,
 * and displays the conversation in a visually formatted chat interface.*
 * @return {JSX.Element} The rendered chat interface with messaging functionality.
 */
export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message:', input);
      let data = await getAIChat(input);
      console.log(
        'AI Chat Response:',
        data.text
      )


      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-[#902425] border-b-2 border-[#902425] pb-2">
        Chat Assistant
      </h1>
      <ChatbotComponent />
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-2xl font-serif tracking-wide text-[#902425] mb-4">Tips for Using the Chat</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Ask questions about recipes in our collection</li>
          <li>Get cooking tips and ingredient substitutions</li>
          <li>Learn about cooking techniques</li>
          <li>Discover new recipe ideas based on ingredients you have</li>
        </ul>
      </div>
    </div>
  );
}