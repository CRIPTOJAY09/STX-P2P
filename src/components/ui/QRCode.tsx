import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 200 }: QRCodeProps) {
  // This is a placeholder. In a real app, use a QR code library
  return (
    <div 
      className="bg-white p-4 rounded-lg"
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full bg-[#05fabd] rounded opacity-20" />
    </div>
  );
}