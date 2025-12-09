import React from 'react';
import { Plus } from 'lucide-react';
import { emotionEmojis } from '../calendar/CalendarCell';
import { Card } from '../common/Card';

interface DayData {
  day: string;
  date: number;
  emotion: string | null;
}

interface WeeklyMiniCalendarProps {
  days: DayData[];
  onDayClick: (date: number) => void;
}

export const WeeklyMiniCalendar: React.FC<WeeklyMiniCalendarProps> = ({ days, onDayClick }) => {
  const today = 8; // 현재 날짜 (예시)

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-7 gap-2">
        {days.map((item, idx) => {
          const emotionData = item.emotion ? emotionEmojis[item.emotion] : null;
          const isToday = item.date === today;
          
          return (
            <button
              key={idx}
              onClick={() => onDayClick(item.date)}
              className={`flex flex-col items-center gap-2 p-2 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95
                ${item.emotion 
                  ? `bg-gradient-to-br ${emotionData?.color} shadow-sm` 
                  : 'bg-gray-50 border-2 border-dashed border-gray-200'
                }
                ${isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
              `}
            >
              <span className="text-xs font-medium text-gray-600">{item.day}</span>
              {item.emotion && emotionData ? (
                <span className="text-3xl">{emotionData.emoji}</span>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                  <Plus size={16} className="text-gray-400" />
                </div>
              )}
              <span className="text-xs font-semibold text-gray-700">{item.date}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default WeeklyMiniCalendar;