import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'Welcome to STX P2P',
    description: 'Trade cryptocurrencies safely and securely',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'New Payment Method',
    description: 'STX PAY now available for all trades',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Banner() {
  return (
    <div className="relative mb-6 rounded-xl overflow-hidden">
      <div className="aspect-[16/6] bg-gray-800">
        <img
          src={announcements[0].image}
          alt={announcements[0].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">{announcements[0].title}</h3>
            <p className="text-gray-200">{announcements[0].description}</p>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <button className="p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}