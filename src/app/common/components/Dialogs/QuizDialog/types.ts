import { Result } from 'app/feature/Feature/Quiz/types';

export interface QuizDialogProps {
  visible: boolean;
  questions: Result[];
  onConfirm: () => void;
}
