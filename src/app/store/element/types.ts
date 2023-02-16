import { DialogNamesEnum } from 'app/core/enum/element/dialog';

export interface ElementState {
  dialogs: DialogsState;
}

export interface DialogsState {
  WarningDialog: DialogState;
  OXOGameDialog: DialogState;
  QuizGameDialog: DialogState;
}

export interface DialogState<T = DialogDataState> {
  visible: boolean;
  data?: T;
}

export interface DialogDataState {
  [k: string]: any;
}

export const ELEMENTS_DIALOGS__SET_DIALOG_VISIBLE = 'ELEMENT_DIALOGS__SET_DIALOG_VISIBLE';

export interface SetDialogVisibleAction {
  type: typeof ELEMENTS_DIALOGS__SET_DIALOG_VISIBLE;
  payload: {
    name: DialogNamesEnum;
    visible: boolean;
    data?: DialogDataState;
  };
};

export type ElementActions = SetDialogVisibleAction
