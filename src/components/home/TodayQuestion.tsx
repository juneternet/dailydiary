import React from 'react';
import { Sparkles, Edit3 } from 'lucide-react';
import { Card } from '../common/Card';

interface TodayQuestionProps {
  question: string;
  date: Date;
  onWrite: () => void;
}

export const TodayQuestion: React.FC<TodayQuestionProps> = ({ question, date, onWrite }) => {
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border-blue-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-300/30 to-blue-400/30 rounded-2xl flex-shrink-0">
          <Sparkles className="text-blue-600" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-bold text-blue-600">오늘의 질문</h3>
            <span className="text-xs text-gray-500">{formatDate(date)}</span>
          </div>
          <p className="text-base text-gray-800 mb-4 leading-relaxed font-medium">
            {question}
          </p>
          <button 
            onClick={onWrite}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-medium bg-gradient-to-r from-blue-300 to-blue-400 text-white hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            <Edit3 size={18} />
            기록하기
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TodayQuestion;