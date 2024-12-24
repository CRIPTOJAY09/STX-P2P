import React from 'react';
import QRCodeReact from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 200 }: QRCodeProps) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <QRCodeReact
        value={value}
        size={size}
        level="H"
        includeMargin
        fgColor="#000000"
        bgColor="#ffffff"
      />
    </div>
  );
}