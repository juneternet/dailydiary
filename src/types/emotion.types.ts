// types/emotion.types.ts
export interface EmotionData {
  key: string;
  emoji: string;
  name: string;
  color: string;
  bgColor: string;
}

export interface EmotionRecord {
  date: Date;
  emotion: string;
  intensity: number; // 1-5
}

// types/journal.types.ts
export interface DailyJournal {
  id: string;
  userId: string;
  date: Date;
  question: string;
  content: string;
  emotion: string;
  sentimentScore: number;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RelationshipJournal {
  id: string;
  userId: string;
  relationType: 'parent' | 'friend' | 'partner' | 'colleague' | 'other';
  relationName?: string;
  content: string;
  emotion: string;
  sentimentScore: number;
  createdAt: Date;
}

// types/letter.types.ts
export interface Letter {
  id: string;
  userId: string;
  title: string;
  content: string;
  sendDate: Date;
  openDate: Date;
  isOpened: boolean;
  createdAt: Date;
}