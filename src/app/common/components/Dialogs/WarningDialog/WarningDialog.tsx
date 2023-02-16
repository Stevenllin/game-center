import React from 'react';
import Dialog from 'app/common/components/Dialogs/Dialog';
import { DialogNamesEnum } from 'app/core/enum/element/dialog';
import { IconTextEnum } from 'app/core/enum/element/icon';
import { WarningDialogProps } from './types';

const WarningDialog: React.FC<WarningDialogProps> = (props) => {
  return (
    <Dialog
      name={DialogNamesEnum.WarningDialog}
      title="Warning"
      visible={props.visible}
      icons={IconTextEnum.Warning}
    >
      <div className="warning__dialog">
        <p>{props.content}</p>
      </div>
    </Dialog>
  )
}

export default WarningDialog;
