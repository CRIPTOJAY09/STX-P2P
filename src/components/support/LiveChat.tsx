import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here you would integrate with your chat service
    console.log('Sending message:', message);
    setMessage('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 p-4 bg-[#05fabd] rounded-full shadow-lg 
                 hover:bg-opacity-90 transition-opacity"
      >
        <MessageCircle className="w-6 h-6 text-gray-900" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 w-[350px] bg-gray-800 rounded-xl shadow-xl 
                  border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="font-medium">Live Support</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-[400px] p-4 overflow-y-auto">
        {/* Chat messages would go here */}
        <div className="text-center text-gray-400 text-sm">
          Start chatting with our support team
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            className="p-2 bg-[#05fabd] text-gray-900 rounded-lg hover:bg-opacity-90 
                     transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}