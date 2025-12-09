export interface EmotionData {
  key: string;
  emoji: string;
  name: string;
  color: string;
  bgColor: string;
}

// 하루콩 스타일의 귀여운 토끼 캐릭터 감정 (연하늘~파란색 계열)
export const EMOTIONS: Record<string, EmotionData> = {
  happy: {
    key: 'happy',
    emoji: '😊',
    name: '행복',
    color: 'from-sky-200 to-sky-300',
    bgColor: 'bg-sky-100'
  },
  excited: {
    key: 'excited',
    emoji: '🤩',
    name: '신남',
    color: 'from-blue-200 to-blue-300',
    bgColor: 'bg-blue-100'
  },
  love: {
    key: 'love',
    emoji: '🥰',
    name: '사랑',
    color: 'from-pink-200 to-pink-300',
    bgColor: 'bg-pink-100'
  },
  calm: {
    key: 'calm',
    emoji: '😌',
    name: '평온',
    color: 'from-cyan-200 to-cyan-300',
    bgColor: 'bg-cyan-100'
  },
  grateful: {
    key: 'grateful',
    emoji: '🙏',
    name: '감사',
    color: 'from-teal-200 to-teal-300',
    bgColor: 'bg-teal-100'
  },
  sad: {
    key: 'sad',
    emoji: '😢',
    name: '슬픔',
    color: 'from-slate-200 to-slate-300',
    bgColor: 'bg-slate-100'
  },
  anxious: {
    key: 'anxious',
    emoji: '😰',
    name: '불안',
    color: 'from-indigo-200 to-indigo-300',
    bgColor: 'bg-indigo-100'
  },
  tired: {
    key: 'tired',
    emoji: '😴',
    name: '피곤',
    color: 'from-gray-200 to-gray-300',
    bgColor: 'bg-gray-100'
  },
  angry: {
    key: 'angry',
    emoji: '😠',
    name: '화남',
    color: 'from-red-200 to-red-300',
    bgColor: 'bg-red-100'
  }
};

export const EMOTION_KEYS = Object.keys(EMOTIONS);
export const EMOTION_VALUES = Object.values(EMOTIONS);