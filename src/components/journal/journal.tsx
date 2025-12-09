// DailyJournalModal.tsx - 하루 한 줄 일기 작성
interface DailyJournalModalProps {
  question: string;
  date: Date;
  onClose: () => void;
  onSave: (content: string, emotion: string) => void;
}

// RelationshipJournalModal.tsx - 관계 일기 작성
interface RelationshipJournalModalProps {
  onClose: () => void;
  onSave: (data: RelationshipJournalData) => void;
}

// EmotionSelector.tsx - 감정 선택기
interface EmotionSelectorProps {
  selectedEmotion: string | null;
  onSelect: (emotion: string) => void;
  emotions: EmotionData[];
}

// JournalEditor.tsx - 일기 편집기
interface JournalEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}