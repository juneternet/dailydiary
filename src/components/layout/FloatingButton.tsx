import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingButtonProps {
  onClick: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-sky-400/50 transition-all duration-300 hover:scale-110 active:scale-95 z-40 flex items-center justify-center group"
      aria-label="새 기록 작성"
    >
      <Plus size={32} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
    </button>
  );
};

// Named export만 사용