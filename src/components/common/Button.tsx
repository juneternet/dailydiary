import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon: Icon, 
  onClick, 
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-sky-400 to-blue-400 text-white hover:from-sky-500 hover:to-blue-500 shadow-md hover:shadow-sky-300/50',
    secondary: 'bg-gradient-to-r from-cyan-200 to-cyan-300 text-sky-900 hover:from-cyan-300 hover:to-cyan-400 shadow-sm',
    ghost: 'bg-white/80 text-sky-700 hover:bg-white border-2 border-sky-200 hover:border-sky-300'
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

// Named export만 사용