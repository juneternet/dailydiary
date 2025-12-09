import React from 'react';
import { Calendar, Settings } from 'lucide-react';

interface HeaderProps {
  onCalendarClick: () => void;
  onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCalendarClick, onSettingsClick }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-sky-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-2xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 하루콩 스타일 로고 */}
            <div className="w-11 h-11 bg-gradient-to-br from-sky-300 to-sky-400 rounded-2xl flex items-center justify-center shadow-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.3"/>
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-sky-900">마인드포켓</h1>
              <p className="text-xs text-sky-600 font-medium">{year}년 {month}월</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onCalendarClick}
              className="w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-sky-100 transition-all duration-200 active:scale-95"
            >
              <Calendar size={22} className="text-sky-600" />
            </button>
            {onSettingsClick && (
              <button 
                onClick={onSettingsClick}
                className="w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-sky-100 transition-all duration-200 active:scale-95"
              >
                <Settings size={22} className="text-sky-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Named export만 사용