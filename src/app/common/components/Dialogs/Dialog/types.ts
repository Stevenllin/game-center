import { DialogNamesEnum } from 'app/core/enum/element/dialog';

export interface DialogProps {
  name: DialogNamesEnum;
  visible: boolean;
  title: string;
  confirmedAutoClose?: boolean,
  showConfirmBtn?: boolean;
  confirmBtnText?: string;
  onClose?: () => void;
  onConfirm?:() => void;
}
