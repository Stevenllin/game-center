import React from 'react'
import Dialog from 'app/common/components/Dialogs/Dialog';
import { DialogNamesEnum } from 'app/core/enum/element/dialog';
import { OXODialogProps } from './types';

const OXODialog: React.FC<OXODialogProps> = (props) => {
  return (
    <Dialog
      name={DialogNamesEnum.OXOGameDialog}
      title={props.winner !== '' ? 'Congratulations' : 'Sorry'}
      visible={props.visible}
      onConfirm={props.onConfirm}
    >
      <div  className="oxo__dialog__content">
        {
          props.winner === '' && (
            <p>Nobody win this round</p>
          )
        }
        {
          props.winner !== '' && (
            <p>{props.winner} win this round</p>
          )
        }
      </div>
    </Dialog>
  )
}

export default OXODialog;