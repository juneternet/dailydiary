// LetterWriteModal.tsx - 편지 작성 모달
interface LetterWriteModalProps {
  onClose: () => void;
  onSave: (data: LetterData) => void;
}

// LetterList.tsx - 편지 목록
interface LetterListProps {
  letters: Letter[];
  filter: 'upcoming' | 'received' | 'all';
  onLetterClick: (letterId: string) => void;
}

// LetterDetail.tsx - 편지 상세보기
interface LetterDetailProps {
  letter: Letter;
  onClose: () => void;
}

// DatePicker.tsx - 날짜 선택기
interface DatePickerProps {
  selectedDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  onDateChange: (date: Date) => void;
}