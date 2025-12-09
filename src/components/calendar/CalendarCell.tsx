import React from 'react';
import { Plus } from 'lucide-react';

interface EmotionData {
  emoji: string;
  color: string;
  bg: string;
  name: string;
}

// 하루콩 스타일 - 연하늘색 계열 감정
export const emotionEmojis: Record<string, EmotionData> = {
  happy: { emoji: '😊', color: 'from-sky-200 to-sky-300', bg: 'bg-sky-100', name: '행복' },
  excited: { emoji: '🤩', color: 'from-blue-200 to-blue-300', bg: 'bg-blue-100', name: '신남' },
  love: { emoji: '🥰', color: 'from-pink-200 to-pink-300', bg: 'bg-pink-100', name: '사랑' },
  calm: { emoji: '😌', color: 'from-cyan-200 to-cyan-300', bg: 'bg-cyan-100', name: '평온' },
  grateful: { emoji: '🙏', color: 'from-teal-200 to-teal-300', bg: 'bg-teal-100', name: '감사' },
  sad: { emoji: '😢', color: 'from-slate-200 to-slate-300', bg: 'bg-slate-100', name: '슬픔' },
  anxious: { emoji: '😰', color: 'from-indigo-200 to-indigo-300', bg: 'bg-indigo-100', name: '불안' },
  tired: { emoji: '😴', color: 'from-gray-200 to-gray-300', bg: 'bg-gray-100', name: '피곤' },
  angry: { emoji: '😠', color: 'from-red-200 to-red-300', bg: 'bg-red-100', name: '화남' }
};

interface CalendarCellProps {
  day: number | null;
  emotion: string | null;
  hasEntry: boolean;
  onClick: () => void;
  isToday?: boolean;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({ 
  day, 
  emotion, 
  hasEntry, 
  onClick,
  isToday = false 
}) => {
  if (!day) return <div className="aspect-square"></div>;

  const emotionData = emotion ? emotionEmojis[emotion] : null;

  return (
    <button
      onClick={onClick}
      className={`aspect-square rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center relative overflow-hidden group
        ${hasEntry 
          ? emotionData 
            ? `bg-gradient-to-br ${emotionData.color} shadow-md border-2 border-white` 
            : 'bg-gray-100 border-2 border-gray-200' 
          : 'bg-white/60 border-2 border-dashed border-sky-200 hover:border-sky-300 hover:bg-white/80'
        }
        ${isToday ? 'ring-4 ring-sky-400 ring-offset-2' : ''}
      `}
    >
      {/* 날짜 숫자 */}
      <div className={`absolute top-1 right-2 text-xs font-bold z-10 ${
        hasEntry ? 'text-gray-700' : 'text-gray-400'
      }`}>
        {day}
      </div>
      
      {/* 감정 이모지 - 하루콩 스타일로 칸을 가득 채움 */}
      {hasEntry && emotionData && (
        <div className="text-4xl md:text-5xl transform transition-transform group-hover:scale-110 group-hover:rotate-6">
          {emotionData.emoji}
        </div>
      )}
      
      {/* 미기록 상태 */}
      {!hasEntry && (
        <div className="flex flex-col items-center gap-1">
          <Plus size={20} className="text-sky-300 group-hover:text-sky-400" />
        </div>
      )}
    </button>
  );
};

// Named export만 사용
export { emotionEmojis };