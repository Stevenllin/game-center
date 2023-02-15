import React from 'react';
import Dialog from 'app/common/components/Dialogs/Dialog';
import { DialogNamesEnum } from 'app/core/enum/element/dialog';
import { QuizDialogProps } from './types';

const QuizDialog: React.FC<QuizDialogProps> = (props) => {
  return (
    <Dialog
      name={DialogNamesEnum.QuizGameDialog}
      title="Check your score"
      visible={props.visible}
    >
      <div className="quiz-dialog-content">123</div>
    </Dialog>
  )
}

export default QuizDialog;
