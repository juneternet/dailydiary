import React, { useState } from 'react';
import { X, Sparkles, Save } from 'lucide-react';
import { emotionEmojis } from '../calendar/CalendarCell';

interface DailyJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  date: Date;
  onSave: (content: string, emotion: string) => void;
}

export const DailyJournalModal: React.FC<DailyJournalModalProps> = ({
  isOpen,
  onClose,
  question,
  date,
  onSave
}) => {
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const maxLength = 200;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setContent(value);
      setCharCount(value.length);
    }
  };

  const handleSave = () => {
    if (content.trim() && selectedEmotion) {
      onSave(content, selectedEmotion);
      setContent('');
      setSelectedEmotion(null);
      setCharCount(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  const emotions = Object.entries(emotionEmojis);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = weekDays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekDay})`;
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-yellow-50/20 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        {/* 헤더 */}
        <div className="p-6 border-b border-gray-200/50 bg-white/70 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-300/40 to-blue-400/40 rounded-2xl flex items-center justify-center">
                <Sparkles className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">하루 한 줄 일기</h2>
                <p className="text-sm text-gray-500">{formatDate(date)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* 오늘의 질문 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200/50">
            <p className="text-sm font-semibold text-blue-600 mb-2">오늘의 질문</p>
            <p className="text-base text-gray-800 font-medium leading-relaxed">
              {question}
            </p>
          </div>

          {/* 일기 작성 영역 */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">
              오늘의 기록
            </label>
            <div className="relative">
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="오늘 하루를 한 줄로 기록해보세요..."
                className="w-full h-32 px-4 py-3 bg-white/90 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none text-gray-800 placeholder:text-gray-400"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {charCount} / {maxLength}
              </div>
            </div>
          </div>

          {/* 감정 선택 */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">
              오늘의 감정
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {emotions.map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedEmotion(key)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                    selectedEmotion === key
                      ? `bg-gradient-to-br ${data.color} shadow-md scale-105 ring-2 ring-offset-2 ring-blue-300`
                      : 'bg-white/60 hover:bg-white/90 border border-gray-200 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl">{data.emoji}</span>
                  <span className="text-xs font-medium text-gray-700">{data.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 도움말 */}
          <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200/50">
            <p className="text-sm text-gray-600">
              💡 <span className="font-semibold">팁:</span> 간단하고 솔직하게 작성해보세요. 
              완벽할 필요는 없어요!
            </p>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="p-6 border-t border-gray-200/50 bg-white/70 backdrop-blur-md">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-all duration-300 active:scale-95"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={!content.trim() || !selectedEmotion}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 active:scale-95 ${
                content.trim() && selectedEmotion
                  ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save size={20} />
              저장하기
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DailyJournalModal;