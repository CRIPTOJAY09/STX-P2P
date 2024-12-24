import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-[95%] max-w-[600px] my-4 px-4 py-6 
                    border-4 border-[#05fabd] rounded-2xl">
      {children}
    </div>
  );
}