import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Announcement {
  id: string;
  type: 'announcement' | 'update' | 'promotion';
  title: string;
  message: string;
  image?: string;
  link?: string;
  expiresAt?: Date;
}

const announcements: Announcement[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'Welcome to STX P2P',
    message: 'Trade cryptocurrencies safely and securely with our platform.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    type: 'update',
    title: 'New Payment Method Available',
    message: 'STX PAY is now available for all trades.',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    type: 'promotion',
    title: '0% Trading Fees',
    message: 'Enjoy zero trading fees for the next 24 hours!',
    image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=600&q=80',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeAnnouncements, setActiveAnnouncements] = useState(announcements);

  useEffect(() => {
    // Filter out expired announcements
    const now = new Date();
    const filtered = announcements.filter(
      announcement => !announcement.expiresAt || announcement.expiresAt > now
    );
    setActiveAnnouncements(filtered);
  }, []);

  useEffect(() => {
    if (activeAnnouncements.length === 0) {
      setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeAnnouncements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeAnnouncements.length]);

  if (!isVisible || activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[currentIndex];
  const typeColors = {
    announcement: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
    update: 'bg-green-500/10 border-green-500/20 text-green-500',
    promotion: 'bg-purple-500/10 border-purple-500/20 text-purple-500'
  };

  const handleClick = () => {
    if (current.link) {
      window.open(current.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="relative mb-6 rounded-xl overflow-hidden border border-[#05fabd]/20 
                 cursor-pointer transition-transform hover:scale-[1.01]"
      onClick={handleClick}
    >
      <div className="aspect-[16/6] bg-gray-800">
        {current.image && (
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="absolute bottom-4 left-4 right-12">
            <div className={`inline-block px-2 py-1 rounded-full text-xs mb-2 ${typeColors[current.type]}`}>
              {current.type.charAt(0).toUpperCase() + current.type.slice(1)}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{current.title}</h3>
            <p className="text-gray-200">{current.message}</p>
            {current.expiresAt && (
              <p className="text-sm text-[#05fabd] mt-2">
                Expires {current.expiresAt.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {activeAnnouncements.length > 1 && (
        <>
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => 
                  (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length
                );
              }}
              className="p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75 
                       transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
              }}
              className="p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75 
                       transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {activeAnnouncements.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#05fabd]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        className="absolute top-2 right-2 p-1 rounded-full bg-gray-900/50 text-white 
                 hover:bg-gray-900/75 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}