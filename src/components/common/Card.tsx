import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick = undefined, 
  hoverable = false 
}) => (
  <div 
    className={`bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-sm border-2 border-sky-100 transition-all duration-300 ${
      hoverable ? 'hover:shadow-lg hover:shadow-sky-200/50 hover:scale-[1.02] cursor-pointer hover:border-sky-200' : ''
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Named export만 사용