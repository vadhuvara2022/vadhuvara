'use client';
import React, { useEffect, useState } from 'react';

interface Message {
  _id: string;
  name: string;
  mobileNumber: string;
  address: string;
  itemId: string;
}

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Messages</h1>
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message._id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Name: {message.name}</p>
            <p className="text-gray-700">Mobile Number: {message.mobileNumber}</p>
            <p className="text-gray-700">Address: {message.address}</p>
            <p className="text-gray-700">Item ID: {message.itemId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesPage;