import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Save, Home, BarChart3, Calendar, Heart, Plus, Settings, Bold, Italic, List, Edit2, Trash2 } from 'lucide-react';

// ========== 타입 정의 ==========
interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  emotion: string;
  subStickers?: string[]; // 여러 개 저장 (순서 유지)
  content: string;
  createdAt: number;
}

interface AppSettings {
  weekStartsOnSunday: boolean;
  fontFamily: string;
}

// ========== 이미지 경로 설정 ==========
const BASE_PATH = import.meta.env?.BASE_URL || '';

// ========== 감정 데이터 ==========
const emotionEmojis = {
  happy: { emoji: '😊', color: 'from-blue-200 to-blue-300', name: '행복', imgPath: `${BASE_PATH}assets/emotions/5-2.png` },
  excited: { emoji: '🤩', color: 'from-purple-200 to-purple-300', name: '신남', imgPath: `${BASE_PATH}assets/emotions/1-1.png` },
  love: { emoji: '🥰', color: 'from-pink-200 to-pink-300', name: '사랑', imgPath: `${BASE_PATH}assets/emotions/3-4.png` },
  calm: { emoji: '😌', color: 'from-cyan-200 to-cyan-300', name: '평온', imgPath: `${BASE_PATH}assets/emotions/4-1.png` },
  sad: { emoji: '😢', color: 'from-gray-300 to-gray-400', name: '슬픔', imgPath: `${BASE_PATH}assets/emotions/2-3.png` }
};

const subStickers = {
  firework: { emoji: '🎉', name: '축하', imgPath: `${BASE_PATH}assets/stickers/6-2.png` },
  beer: { emoji: '🍺', name: '맥주', imgPath: `${BASE_PATH}assets/stickers/6-1.png` },
  hat: { emoji: '🎩', name: '모자', imgPath: `${BASE_PATH}assets/stickers/6-1.png` },
  tear: { emoji: '💧', name: '눈물', imgPath: `${BASE_PATH}assets/stickers/6-4.png` },
  star: { emoji: '⭐', name: '별', imgPath: `${BASE_PATH}assets/stickers/6-4.png` },
  heart: { emoji: '💕', name: '하트', imgPath: `${BASE_PATH}assets/stickers/6-1.png` },
  coffee: { emoji: '☕', name: '커피', imgPath: `${BASE_PATH}assets/stickers/6-3.png` },
  book: { emoji: '📚', name: '책', imgPath: `${BASE_PATH}assets/stickers/6-1.png` }
};

const MASCOT_PATH = `${BASE_PATH}assets/mascot.png`;

// ========== 유틸리티 함수 ==========
const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const formatDateKorean = (date: Date): string => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = weekDays[date.getDay()];
  return `${month}월 ${day}일 ${weekDay}요일`;
};

const isToday = (dateToCheck: Date): boolean => {
  const today = new Date();
  const checkDate = new Date(dateToCheck);
  today.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.getTime() === today.getTime();
};

const isFuture = (dateToCheck: Date): boolean => {
  const today = new Date();
  const checkDate = new Date(dateToCheck);
  today.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.getTime() > today.getTime();
};

const isPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

// ========== 메인 앱 ==========
const MindPocketApp = () => {
  const [currentView, setCurrentView] = useState<'home' | 'stats' | 'calendar' | 'my'>('home');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showMascotModal, setShowMascotModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [journalStep, setJournalStep] = useState<'emotion' | 'sticker' | 'writing'>('emotion');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedSubSticker, setSelectedSubSticker] = useState<string | null>(null);
  const [selectedSubStickers, setSelectedSubStickers] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [settings, setSettings] = useState<AppSettings>({
    weekStartsOnSunday: false,
    fontFamily: 'default'
  });

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    const savedSettings = localStorage.getItem('appSettings');
    
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // 데이터 저장
  const saveEntry = (entry: JournalEntry) => {
    const newEntries = [...journalEntries.filter(e => e.date !== entry.date), entry];
    setJournalEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
  };

  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  // 캘린더 로직
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const adjustedFirstDay = settings.weekStartsOnSunday ? firstDay : (firstDay === 0 ? 6 : firstDay - 1);
    
    const days: (Date | null)[] = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta));
  };

  // 일기 작성 플로우
  const handleMascotClick = () => {
    // 미래 날짜에는 작성 불가
    if (isFuture(selectedDate)) {
      return;
    }
    setShowMascotModal(!showMascotModal);
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setShowMascotModal(false);
    setJournalStep('sticker');
    setShowJournalModal(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setSelectedEmotion(entry.emotion);
    setSelectedSubStickers(entry.subStickers || []);
    setContent(entry.content);
    setJournalStep('writing');
    setShowJournalModal(true);
  };

  const handleDeleteEntry = (entry: JournalEntry) => {
    if (window.confirm('정말로 이 일기를 삭제하시겠습니까?')) {
      const newEntries = journalEntries.filter(e => e.id !== entry.id);
      setJournalEntries(newEntries);
      localStorage.setItem('journalEntries', JSON.stringify(newEntries));
    }
  };

  const handleSubStickerSelect = (sticker: string | null) => {
    if (sticker === null) {
      // 건너뛰기
      setSelectedSubStickers([]);
      setJournalStep('writing');
    } else {
      // 스티커 토글 (이미 선택되어 있으면 제거, 없으면 추가)
      setSelectedSubStickers(prev => {
        if (prev.includes(sticker)) {
          return prev.filter(s => s !== sticker);
        } else {
          return [...prev, sticker];
        }
      });
    }
  };

  const handleSaveJournal = () => {
    if (content.trim() && selectedEmotion) {
      const entry: JournalEntry = {
        id: editingEntry ? editingEntry.id : Date.now().toString(),
        date: getDateString(selectedDate),
        emotion: selectedEmotion,
        subStickers: selectedSubStickers.length > 0 ? selectedSubStickers : undefined,
        content: content.trim(),
        createdAt: editingEntry ? editingEntry.createdAt : Date.now()
      };
      saveEntry(entry);
      
      // 초기화
      setContent('');
      setSelectedEmotion(null);
      setSelectedSubSticker(null);
      setSelectedSubStickers([]);
      setJournalStep('emotion');
      setShowJournalModal(false);
      setEditingEntry(null);
    }
  };

  const handleCloseModal = () => {
    setShowJournalModal(false);
    setJournalStep('emotion');
    setSelectedEmotion(null);
    setSelectedSubSticker(null);
    setSelectedSubStickers([]);
    setContent('');
    setEditingEntry(null);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // 미래 날짜 선택 시 마스코트 모달 닫기
    if (isFuture(date)) {
      setShowMascotModal(false);
    }
  };

  // 선택된 날짜의 일기 가져오기
  const getEntryForDate = (date: Date): JournalEntry | undefined => {
    return journalEntries.find(entry => entry.date === getDateString(date));
  };

  const selectedEntry = getEntryForDate(selectedDate);

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const weekDays = settings.weekStartsOnSunday 
    ? ['일', '월', '화', '수', '목', '금', '토']
    : ['월', '화', '수', '목', '금', '토', '일'];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-20" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-sky-400 rounded-2xl flex items-center justify-center shadow-md">
                <img 
                  src={MASCOT_PATH}
                  alt="마스코트" 
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Heart className="text-white hidden" size={24} fill="white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">마인드포켓</h1>
                <p className="text-xs text-gray-600 font-medium">
                  {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
            >
              <Settings size={22} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-2xl mx-auto px-5 py-4 space-y-4">
        {/* 캘린더 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => changeMonth(-1)} 
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-bold text-gray-800">
              {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
            </h2>
            <button 
              onClick={() => changeMonth(1)} 
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, idx) => (
              <div key={idx} className="text-center text-xs font-bold text-gray-700 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              if (!day) return <div key={idx} className="aspect-square"></div>;
              
              const entry = getEntryForDate(day);
              const emotionInfo = entry ? emotionEmojis[entry.emotion] : null;
              const subStickerInfo = entry?.subStickers?.[0] ? subStickers[entry.subStickers[0]] : null;
              const isTodayDate = isToday(day);
              const isSelected = getDateString(day) === getDateString(selectedDate);

              return (
                <button
                  key={idx}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center relative bg-white hover:bg-gray-50
                    ${isTodayDate ? 'border-2 border-blue-400' : isSelected ? 'border-2 border-blue-300' : 'border-2 border-transparent'}
                  `}
                >
                  <div className={`absolute top-0.5 left-1/2 -translate-x-1/2 text-[10px] font-bold z-20 ${
                    isTodayDate ? 'text-blue-500' : isSelected ? 'text-blue-400' : entry ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  {entry && emotionInfo ? (
                    <>
                      <img 
                        src={emotionInfo.imgPath}
                        alt={emotionInfo.name}
                        className="absolute inset-0 w-full h-full object-contain p-0.5 pt-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const emoji = document.createElement('div');
                            emoji.className = 'absolute inset-0 flex items-center justify-center text-4xl pt-3';
                            emoji.textContent = emotionInfo.emoji;
                            parent.appendChild(emoji);
                          }
                        }}
                      />
                      
                      {subStickerInfo && (
                        <img 
                          src={subStickerInfo.imgPath}
                          alt={subStickerInfo.name}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 p-0.5 pt-4"
                          style={{ mixBlendMode: 'normal' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-3" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택된 날짜의 일기 표시 */}
        {selectedEntry ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              {/* 왼쪽: 감정 아이콘과 날짜 뱃지 */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <img 
                  src={emotionEmojis[selectedEntry.emotion].imgPath}
                  alt={emotionEmojis[selectedEntry.emotion].name}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="text-5xl hidden">
                  {emotionEmojis[selectedEntry.emotion].emoji}
                </div>
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {selectedDate.getDate()}일 {['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]}
                </div>
              </div>

              {/* 오른쪽: 서브 스티커와 내용 */}
              <div className="flex-1 space-y-3">
                {/* 서브 스티커들 */}
                {selectedEntry.subStickers && selectedEntry.subStickers.length > 0 && (
                  <div className="flex items-center gap-2">
                    {selectedEntry.subStickers.map((stickerId, index) => (
                      <div key={index} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <img 
                          src={subStickers[stickerId].imgPath}
                          alt={subStickers[stickerId].name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="text-xl hidden">
                          {subStickers[stickerId].emoji}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 일기 내용 */}
                <div>
                  <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>
                </div>
              </div>

              {/* 수정/삭제 버튼 */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEditEntry(selectedEntry)}
                  className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  title="수정"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteEntry(selectedEntry)}
                  className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  title="삭제"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            {isFuture(selectedDate) ? (
              <p className="text-gray-400 text-sm">아직 다가오지 않은 날이에요</p>
            ) : isPast(selectedDate) ? (
              <p className="text-gray-400 text-sm">지나간 날이에요</p>
            ) : (
              <p className="text-gray-400 text-sm">오늘의 감정을 기록해보세요</p>
            )}
          </div>
        )}
      </main>

      {/* 마스코트 말풍선 모달 */}
      {showMascotModal && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowMascotModal(false)}
        >
          <div 
            className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-xs mx-4 relative">
              {/* 말풍선 꼬리 */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-white"></div>
              
              <p className="text-center text-sm text-gray-600 mb-4 font-medium">
                오늘 하루는 어땠나요?
              </p>
              
              <div className="flex items-center justify-center gap-3">
                {Object.entries(emotionEmojis).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => handleEmotionSelect(key)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-sky-50 transition-all active:scale-95"
                  >
                    <img 
                      src={data.imgPath}
                      alt={data.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <span className="text-3xl hidden">{data.emoji}</span>
                    <span className="text-xs font-medium text-gray-600">{data.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 일기 작성 모달 */}
      {showJournalModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up shadow-2xl"
            style={{ fontFamily: "'Cute Font', 'Nanum Pen Script', cursive" }}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50">
              <div className="flex items-center gap-3">
                {selectedEmotion && (
                  <>
                    <img 
                      src={emotionEmojis[selectedEmotion].imgPath}
                      alt={emotionEmojis[selectedEmotion].name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="text-5xl hidden">
                      {emotionEmojis[selectedEmotion].emoji}
                    </div>
                  </>
                )}
                {selectedSubStickers.length > 0 && (
                  <div className="flex gap-1">
                    {selectedSubStickers.slice(0, 3).map((stickerId, index) => (
                      <div key={index} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <img 
                          src={subStickers[stickerId].imgPath}
                          alt={subStickers[stickerId].name}
                          className="w-4 h-4 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingEntry ? '일기 수정' : journalStep === 'sticker' ? '서브 감정 선택' : journalStep === 'emotion' ? '감정 선택' : '일기 작성'}
                  </h2>
                  <p className="text-sm text-gray-500">{formatDateKorean(selectedDate)}</p>
                </div>
              </div>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-xl">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {journalStep === 'sticker' ? (
                <div className="space-y-4">
                  <p className="text-center text-gray-600 mb-4">
                    오늘 하루를 더 표현할 스티커를 선택하거나 건너뛰세요 (여러 개 선택 가능)
                  </p>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(subStickers).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => handleSubStickerSelect(key)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                          selectedSubStickers.includes(key)
                            ? 'bg-blue-100 ring-2 ring-blue-400 scale-105'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <img 
                          src={data.imgPath}
                          alt={data.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <span className="text-4xl hidden">{data.emoji}</span>
                        <span className="text-sm font-medium text-gray-700">{data.name}</span>
                        {selectedSubStickers.includes(key) && (
                          <span className="text-xs text-blue-600 font-bold">
                            {selectedSubStickers.indexOf(key) + 1}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSubStickerSelect(null)}
                      className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                    >
                      건너뛰기
                    </button>
                    {selectedSubStickers.length > 0 && (
                      <button
                        onClick={() => setJournalStep('writing')}
                        className="flex-1 py-3 rounded-2xl bg-blue-500 text-white font-medium hover:bg-blue-600"
>
다음
</button>
)}
</div>
</div>
) : (
<div className="space-y-4">
<div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
<p className="text-gray-700 text-lg">
오늘 하루는 어땠나요? 자유롭게 적어보세요 ✨
</p>
</div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="오늘 하루를 기록해보세요...&#10;&#10;예시:&#10;• 오늘은 친구들과 맛있는 저녁을 먹었다&#10;• 프로젝트가 잘 진행되어서 기분이 좋았다&#10;• 힘든 일이 있었지만 잘 극복했다"
                className="w-full h-64 px-5 py-4 bg-yellow-50/50 border-2 border-yellow-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-800 text-lg leading-relaxed"
                maxLength={500}
                autoFocus
                style={{ fontFamily: "'Cute Font', 'Nanum Pen Script', cursive" }}
              />
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>💡 솔직하게 작성해보세요</span>
                <span>{content.length}/500</span>
              </div>
            </div>
          )}
        </div>

        {journalStep === 'writing' && (
          <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-sky-50 to-blue-50">
            <button
              onClick={handleSaveJournal}
              disabled={!content.trim()}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all ${
                content.trim()
                  ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-md hover:shadow-lg active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save size={22} />
              저장하기
            </button>
          </div>
        )}
      </div>
    </div>
  )}

  {/* 설정 모달 */}
  {showSettingsModal && (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50">
          <h2 className="text-xl font-bold text-gray-800">설정</h2>
          <button onClick={() => setShowSettingsModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-sky-50 rounded-2xl">
            <span className="font-medium text-gray-700">일요일부터 시작</span>
            <button
              onClick={() => saveSettings({ ...settings, weekStartsOnSunday: !settings.weekStartsOnSunday })}
              className={`w-14 h-8 rounded-full transition-all ${
                settings.weekStartsOnSunday ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                settings.weekStartsOnSunday ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
            <p className="text-sm text-gray-600">
              💡 <strong>팁:</strong> 데이터는 브라우저에 안전하게 저장됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* 하단 네비게이션 바 */}
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
    <div className="max-w-2xl mx-auto px-5 relative">
      <div className="flex items-center justify-around py-3">
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            currentView === 'home' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <Home size={24} />
          <span className="text-xs font-medium">홈</span>
        </button>

        <button 
          onClick={() => setCurrentView('stats')}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            currentView === 'stats' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <BarChart3 size={24} />
          <span className="text-xs font-medium">통계</span>
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 -top-10">
          <button 
            onClick={handleMascotClick}
            className={`w-24 h-24 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-visible ${
              showMascotModal ? 'animate-mascot-bounce' : ''
            }`}
          >
            <img 
              src={MASCOT_PATH}
              alt="마스코트" 
              className="w-full h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('bg-gradient-to-br', 'from-sky-400', 'to-blue-500', 'shadow-2xl', 'hover:shadow-sky-400/50');
                  const icon = document.createElement('div');
                  icon.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
                  parent.appendChild(icon);
                }
              }}
            />
          </button>
        </div>

        <button 
          onClick={() => setCurrentView('calendar')}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            currentView === 'calendar' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <Calendar size={24} />
          <span className="text-xs font-medium">캘린더</span>
        </button>

        <button 
          onClick={() => setCurrentView('my')}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
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
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Nanum+Pen+Script&display=swap');
    
    @keyframes slide-up {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes bounce-in {
      0% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px) scale(0.8);
      }
      50% {
        opacity: 1;
        transform: translateX(-50%) translateY(-5px) scale(1.05);
      }
      70% {
        transform: translateX(-50%) translateY(2px) scale(0.95);
      }
      100% {
        transform: translateX(-50%) translateY(0) scale(1);
      }
    }
    
    @keyframes mascot-bounce {
      0% {
        transform: scale(1, 1);
      }
      20% {
        transform: scale(1.15, 0.85);
      }
      40% {
        transform: scale(0.95, 1.05);
      }
      60% {
        transform: scale(1.05, 0.95);
      }
      80% {
        transform: scale(0.98, 1.02);
      }
      100% {
        transform: scale(1, 1);
      }
    }
    
    .animate-slide-up {
      animation: slide-up 0.3s ease-out;
    }
    
    .animate-bounce-in {
      animation: bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .animate-mascot-bounce {
      animation: mascot-bounce 0.5s ease-out;
    }
  `}</style>
</div>
);
};
export default MindPocketApp;