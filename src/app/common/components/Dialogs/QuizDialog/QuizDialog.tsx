import React from 'react';
import Dialog from 'app/common/components/Dialogs/Dialog';
import { DialogNamesEnum } from 'app/core/enum/element/dialog';
import { QuizDialogProps } from './types';

const QuizDialog: React.FC<QuizDialogProps> = (props) => {
  console.log('props.questions', props.questions);
  return (
    <Dialog
      name={DialogNamesEnum.QuizGameDialog}
      title="Congratulations!!"
      visible={props.visible}
    >
      <div className="quiz__dialog__answer p-3">
        {
          props.questions.map((question, index) => {
            return (
              <div key={index} className="my-2">
                <p>{index + 1}: <span>{question.question}</span></p>
                {
                  question.options.map((option, index) => {
                    if (option === question.answer && question.answer === question.choose) {
                      return <p key={index} className="right">- {option}</p>
                    } else if (option === question.choose && question.answer !== question.choose) {
                      return <p key={index} className="wrong">- {option}</p>
                    } else if (option === question.answer && question.answer !== question.choose) {
                      return <p key={index} className="answer">- {option}</p>
                    } else {
                      return (
                        <p key={index}>- {option}</p>
                      )
                    }
                  })
                }
              </div>
            )
          })
        }
      </div>
    </Dialog>
  )
}

export default QuizDialog;
