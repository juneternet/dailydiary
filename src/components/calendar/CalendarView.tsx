import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, TrendingUp, Share2 } from 'lucide-react';
import { CalendarCell } from './CalendarCell';
import { Button } from '../common/Button';

interface CalendarViewProps {
  onClose: () => void;
  onDateClick: (day: number) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onClose, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11));
  
  // 임시 감정 데이터
  const emotionData: Record<number, string> = {
    1: 'happy', 2: 'excited', 3: 'calm', 5: 'grateful', 6: 'happy',
    8: 'love', 9: 'happy', 10: 'calm', 12: 'tired', 13: 'grateful',
    15: 'happy', 16: 'excited', 17: 'calm', 19: 'anxious', 20: 'happy',
    22: 'grateful', 23: 'love', 24: 'happy', 26: 'calm', 27: 'excited'
  };

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta));
  };

  const today = new Date().getDate();

  return (
    <div className="fixed inset-0 bg-sky-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn">
        {/* 헤더 */}
        <div className="p-6 border-b border-sky-200 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* 하루콩 스타일 로고 */}
              <div className="w-10 h-10 bg-gradient-to-br from-sky-300 to-sky-400 rounded-2xl flex items-center justify-center shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.5"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <button 
                onClick={() => changeMonth(-1)} 
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-sky-100 transition-colors"
              >
                <ChevronLeft size={20} className="text-sky-600" />
              </button>
              <h2 className="text-xl font-bold text-sky-900">
                {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
              </h2>
              <button 
                onClick={() => changeMonth(1)} 
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-sky-100 transition-colors"
              >
                <ChevronRight size={20} className="text-sky-600" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-sky-100 transition-colors"
            >
              <X size={24} className="text-sky-600" />
            </button>
          </div>

          {/* 통계 요약 - 하루콩 스타일 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl p-4 text-center border-2 border-white shadow-sm">
              <p className="text-xs text-sky-700 font-medium mb-1">총 기록</p>
              <p className="text-3xl font-bold text-sky-600">24일</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 text-center border-2 border-white shadow-sm">
              <p className="text-xs text-blue-700 font-medium mb-1">긍정 감정</p>
              <p className="text-3xl font-bold text-blue-600">78%</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl p-4 text-center border-2 border-white shadow-sm">
              <p className="text-xs text-cyan-700 font-medium mb-1">연속 기록</p>
              <p className="text-3xl font-bold text-cyan-600">5일</p>
            </div>
          </div>
        </div>

        {/* 캘린더 */}
        <div className="flex-1 overflow-auto p-6">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {weekDays.map((day, idx) => (
              <div key={idx} className="text-center text-sm font-bold text-sky-700 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 - 하루콩 스타일 */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => (
              <CalendarCell
                key={idx}
                day={day}
                emotion={day ? emotionData[day] || null : null}
                hasEntry={day ? !!emotionData[day] : false}
                onClick={() => day && onDateClick(day)}
                isToday={day === today}
              />
            ))}
          </div>
        </div>

        {/* 하단 액션 - 하루콩 스타일 */}
        <div className="p-6 border-t border-sky-200 bg-white/80 backdrop-blur-xl">
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 text-white hover:from-sky-500 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95">
              <Plus size={22} strokeWidth={2.5} />
              오늘 기록하기
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold bg-white text-sky-600 hover:bg-sky-50 border-2 border-sky-200 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              <TrendingUp size={22} />
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold bg-white text-sky-600 hover:bg-sky-50 border-2 border-sky-200 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              <Share2 size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Named export만 사용