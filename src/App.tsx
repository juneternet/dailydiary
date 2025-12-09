import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Save, Home, BarChart3, Calendar, Heart } from 'lucide-react';

// 이미지 import
import mascotImg from '/assets/mascot.png';
import emotion1_1 from '/assets/emotions/1-1.png';
import emotion5_2 from '/assets/emotions/5-2.png';
import sticker6_1 from '/assets/stickers/6-1.png';
import sticker6_2 from '/assets/stickers/6-2.png';
import sticker6_3 from '/assets/stickers/6-3.png';
import sticker6_4 from '/assets/stickers/6-4.png';

// 감정 데이터
const emotionEmojis = {
  happy: { emoji: '😊', color: 'bg-blue-100', name: '행복', imgPath: emotion5_2 },
  excited: { emoji: '🤩', color: 'bg-blue-200', name: '신남', imgPath: emotion1_1 },
  love: { emoji: '🥰', color: 'bg-blue-300', name: '사랑', imgPath: emotion1_1 },
  calm: { emoji: '😌', color: 'bg-sky-100', name: '평온', imgPath: emotion1_1 },
  sad: { emoji: '😢', color: 'bg-sky-200', name: '슬픔', imgPath: emotion1_1 }
};

// 서브 스티커 데이터
const subStickers = {
  firework: { emoji: '🎉', name: '축하', imgPath: sticker6_2 },
  beer: { emoji: '🍺', name: '맥주', imgPath: sticker6_1 },
  hat: { emoji: '🎩', name: '모자', imgPath: sticker6_1 },
  tear: { emoji: '💧', name: '눈물', imgPath: sticker6_4 },
  star: { emoji: '⭐', name: '별', imgPath: sticker6_4 },
  heart: { emoji: '💕', name: '하트', imgPath: sticker6_1 },
  coffee: { emoji: '☕', name: '커피', imgPath: sticker6_3 },
  book: { emoji: '📚', name: '책', imgPath: sticker6_1 }
};

const MindPocketApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 1));
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedSubSticker, setSelectedSubSticker] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [showMascotModal, setShowMascotModal] = useState(false);
  const [journalStep, setJournalStep] = useState<'emotion' | 'sticker' | 'writing'>('emotion');

  const todayQuestion = "오늘 나를 웃게 만든 작은 일이 있었나요?";

  const emotionData: Record<number, { emotion: string; subSticker?: string }> = {
    1: { emotion: 'happy' },
    2: { emotion: 'happy', subSticker: 'firework' },
    3: { emotion: 'happy' },
    4: { emotion: 'happy' },
    5: { emotion: 'happy' },
    6: { emotion: 'calm', subSticker: 'coffee' },
    7: { emotion: 'calm' },
    8: { emotion: 'sad', subSticker: 'tear' },
    9: { emotion: 'sad' },
    10: { emotion: 'calm', subSticker: 'book' },
    11: { emotion: 'calm' },
    12: { emotion: 'calm' },
    13: { emotion: 'calm' },
    14: { emotion: 'calm', subSticker: 'heart' },
    15: { emotion: 'happy', subSticker: 'beer' },
    16: { emotion: 'calm' },
    17: { emotion: 'calm' },
    18: { emotion: 'calm' },
    19: { emotion: 'calm' },
    20: { emotion: 'calm' },
    21: { emotion: 'calm' },
    22: { emotion: 'sad' },
    23: { emotion: 'calm' },
    24: { emotion: 'calm' },
    25: { emotion: 'calm' },
    26: { emotion: 'calm' },
    27: { emotion: 'calm' },
    28: { emotion: 'calm' }
  };

  const recentEntries = [
    {
      date: '2월 8일 수요일',
      emotion: 'sad',
      content: '오늘은 즐거운 일이 많은 하루였습니다'
    }
  ];

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

  const handleMascotClick = () => {
    setShowMascotModal(!showMascotModal);
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setShowMascotModal(false);
    setJournalStep('sticker');
    setShowJournalModal(true);
  };

  const handleSubStickerSelect = (sticker: string | null) => {
    setSelectedSubSticker(sticker);
    setJournalStep('writing');
  };

  const handleSaveJournal = () => {
    if (content.trim() && selectedEmotion) {
      console.log('일기 저장:', { content, emotion: selectedEmotion, subSticker: selectedSubSticker });
      setContent('');
      setSelectedEmotion(null);
      setSelectedSubSticker(null);
      setJournalStep('emotion');
      setShowJournalModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowJournalModal(false);
    setJournalStep('emotion');
    setSelectedEmotion(null);
    setSelectedSubSticker(null);
    setContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={mascotImg}
                alt="마스코트"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <button 
                onClick={() => changeMonth(-1)} 
                className="w-8 h-8 flex items-center justify-center"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <h2 className="text-base font-bold text-gray-800">
                {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
              </h2>
              <button 
                onClick={() => changeMonth(1)} 
                className="w-8 h-8 flex items-center justify-center"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-2xl mx-auto px-5 py-4 space-y-4">
        {/* 캘린더 */}
        <div className="bg-white rounded-2xl p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, idx) => (
              <div key={idx} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              if (!day) return <div key={idx} className="aspect-square"></div>;
              
              const dayData = emotionData[day];
              const emotionInfo = dayData ? emotionEmojis[dayData.emotion] : null;
              const subStickerInfo = dayData?.subSticker ? subStickers[dayData.subSticker] : null;
              const isToday = day === 8;

              return (
                <button
                  key={idx}
                  className={`aspect-square rounded-2xl flex items-center justify-center relative p-1 transition-transform hover:scale-105 ${
                    isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                  }`}
                >
                  {emotionInfo && (
                    <img 
                      src={emotionInfo.imgPath}
                      alt={emotionInfo.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                  
                  {subStickerInfo && (
                    <img 
                      src={subStickerInfo.imgPath}
                      alt={subStickerInfo.name}
                      className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                      style={{ mixBlendMode: 'normal' }}
                    />
                  )}
                  
                  <span className="absolute top-0.5 right-1.5 text-[9px] font-medium text-gray-400 bg-white/80 px-1 rounded z-20">{day}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 하단 아이콘들 */}
        <div className="flex items-center justify-center gap-4 py-2">
          <button className="w-10 h-10 flex items-center justify-center">
            <span className="text-2xl">🌱</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <span className="text-2xl">📤</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <span className="text-2xl">✏️</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <span className="text-2xl">🗑️</span>
          </button>
        </div>

        {/* 최근 일기 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 flex-shrink-0">
              <img 
                src={emotionEmojis.sad.imgPath}
                alt={emotionEmojis.sad.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">{recentEntries[0].date}</p>
              <p className="text-base text-gray-800 leading-relaxed">
                {recentEntries[0].content}
              </p>
            </div>
          </div>
        </div>

        {/* 하단 감정 아이콘들 */}
        <div className="flex items-center justify-center gap-3 py-3">
          {Object.entries(emotionEmojis).map(([key, data]) => (
            <button
              key={key}
              className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <img 
                src={data.imgPath}
                alt={data.name}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
          <button className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform">
            <span className="text-2xl">💤</span>
          </button>
          <button className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform">
            <span className="text-2xl">😊</span>
          </button>
          <button className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform">
            <span className="text-2xl">🍀</span>
          </button>
        </div>
      </main>

      {/* 마스코트 말풍선 모달 */}
      {showMascotModal && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowMascotModal(false)}
        >
          <div 
            className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-xs mx-4 relative">
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rotate-45"></div>
              
              <p className="text-center text-sm text-gray-600 mb-4 font-medium">
                오늘 하루는 어땠나요? 🌟
              </p>
              
              <div className="flex items-center justify-center gap-3">
                {Object.entries(emotionEmojis).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => handleEmotionSelect(key)}
                    className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                  >
                    <img 
                      src={data.imgPath}
                      alt={data.name}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 일기 작성 모달 */}
      {showJournalModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedEmotion && (
                  <div className="w-12 h-12 flex items-center justify-center relative">
                    <img 
                      src={emotionEmojis[selectedEmotion].imgPath}
                      alt={emotionEmojis[selectedEmotion].name}
                      className="w-full h-full object-contain"
                    />
                    {selectedSubSticker && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                        <img 
                          src={subStickers[selectedSubSticker].imgPath}
                          alt={subStickers[selectedSubSticker].name}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
                <h2 className="text-lg font-bold text-gray-800">
                  {journalStep === 'sticker' ? '서브 스티커를 선택하세요 (선택)' : '오늘 하루를 기록해보세요'}
                </h2>
              </div>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-xl">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {journalStep === 'sticker' ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 text-center mb-4">
                    오늘 하루를 더 표현할 스티커를 선택하거나 건너뛰세요
                  </p>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(subStickers).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => handleSubStickerSelect(key)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                          selectedSubSticker === key
                            ? 'bg-blue-100 ring-2 ring-blue-400 scale-105'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <img 
                          src={data.imgPath}
                          alt={data.name}
                          className="w-12 h-12 object-contain"
                        />
                        <span className="text-xs font-medium text-gray-700">{data.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleSubStickerSelect(null)}
                    className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                  >
                    건너뛰기
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-700">
                      {todayQuestion}
                    </p>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="오늘 하루를 한 줄로 기록해보세요..."
                    className="w-full h-40 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-800"
                    maxLength={200}
                    autoFocus
                  />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>💡 간단하고 솔직하게 작성해보세요</span>
                    <span>{content.length}/200</span>
                  </div>
                </div>
              )}
            </div>

            {journalStep === 'writing' && (
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={handleSaveJournal}
                  disabled={!content.trim()}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium ${
                    content.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Save size={20} />
                  저장하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 하단 네비게이션 바 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div className="max-w-2xl mx-auto px-5 relative">
          <div className="flex items-center justify-around py-3">
            <button 
              onClick={() => setCurrentView('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === 'home' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <Home size={24} />
              <span className="text-xs font-medium">홈</span>
            </button>

            <button 
              onClick={() => setCurrentView('stats')}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === 'stats' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <BarChart3 size={24} />
              <span className="text-xs font-medium">통계</span>
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 -top-8">
              <button 
                onClick={handleMascotClick}
                className="w-20 h-20 flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
              >
                <img 
                  src={mascotImg}
                  alt="마스코트"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </button>
            </div>

            <button 
              onClick={() => setCurrentView('calendar')}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === 'calendar' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <Calendar size={24} />
              <span className="text-xs font-medium">캘린더</span>
            </button>

            <button 
              onClick={() => setCurrentView('my')}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                currentView === 'my' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <Heart size={24} />
              <span className="text-xs font-medium">MY</span>
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.3);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.05);
          }
          70% {
            transform: translateX(-50%) scale(0.9);
          }
          100% {
            transform: translateX(-50%) scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MindPocketApp;